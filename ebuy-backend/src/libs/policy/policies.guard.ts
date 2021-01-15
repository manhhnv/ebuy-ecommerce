import {
    CanActivate, ExecutionContext, Injectable,
    HttpException, HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory, AppAbility } from "../casl/casl-ability.factory";
import { PolicyHandler } from "./policy.config";
import { CHECK_POLICIES_KEY } from "./policy.decorator";
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PoliciesGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler()
            )
        const graphQlContext = GqlExecutionContext.create(context as ExecutionContext)
        const info = graphQlContext.getInfo();
        let req: Request
        let res: Response
        let ctx;
        if (info) {
            ctx = graphQlContext.getContext()
            req = ctx.req
            res = ctx.res
            ctx.user = await this.validateToken(ctx.headers.authorization)
            const ability = this.caslAbilityFactory.createForUser(ctx.user);
            return policyHandlers.every((handler) =>
                this.execPolicyHandler(handler, ability),
            );
        }
        else {
            req = context.switchToHttp().getRequest()
            res = context.switchToHttp().getResponse()
            const user = await this.validateToken(req.headers.authorization)
            const ability = this.caslAbilityFactory.createForUser(user);
            return policyHandlers.every((handler) =>
                this.execPolicyHandler(handler, ability),
            );
        }
    }
    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        try {
            const res: any = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            return res
        }
        catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
    }
    private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
        if (typeof handler === 'function') {
            return handler(ability);
        }
        return handler.handle(ability);
    }
}