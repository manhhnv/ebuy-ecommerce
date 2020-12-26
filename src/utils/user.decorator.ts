import { GqlExecutionContext } from "@nestjs/graphql";
import { createParamDecorator } from "@nestjs/common";


export const CtxUser = createParamDecorator((data, ctx) => GqlExecutionContext.create(ctx).getContext().req.user)