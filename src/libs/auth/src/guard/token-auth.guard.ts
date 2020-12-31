import {
    CanActivate, Injectable, ExecutionContext,
    HttpException, HttpStatus,
    ArgumentsHost
 } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
@Injectable()
export class TokenAuthGuard implements CanActivate {
    constructor(private authService: AuthService){}
    async canActivate(context: ExecutionContext) {

        const graphQlContext = GqlExecutionContext.create(context as ExecutionContext)
        const restContext = GqlExecutionContext.create(context as ExecutionContext)
        const info = graphQlContext.getInfo();
        let req: Request
        let res: Response
        let ctx;
        // console.log(req.session.id)
        if (info) {
            ctx = graphQlContext.getContext()
            req = ctx.req
            res = ctx.res
            console.log("INFO", ctx.session.id)
        }
        // else {
        //     req = context.switchToHttp().getRequest()
        //     res = context.switchToHttp().getResponse()
        // }
        if (req.session) {
            console.log("SessionId", req.session.id)
            // const cookie = await req.res.cookie('token', req.sessionID)
            // ctx.sessionId = req.sessionID
            // console.log("ASASA", req.session.cookie)
            // req.signedCookies
        }
        else {
            console.log("Session not exists")
        }
        // console.log("session", req.session.regenerate(() => {}))
        if (!ctx.headers.authorization) {
            return false;
        }
        ctx.user = await this.validateToken(ctx.headers.authorization)
        return true;
    }
    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        try {
            const res: any = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            const test  = await this.authService.findUserById("abc")
            return res
        }
        catch(e) {
            throw new HttpException('Invalid tokenasas', HttpStatus.UNAUTHORIZED)
        }
    }
}