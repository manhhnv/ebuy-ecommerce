import { Resolver, Mutation, Query, Args, ResolveField, Context,} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { CreateUserInput, LoginInput, User } from 'src/generate-types';
import { UseGuards, Request, Req, Session} from '@nestjs/common';
import { JwtAuthGuard } from 'src/libs/auth/src/service/jwt-auth.guard';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
// import { Ctx } from 'type-graphql';
// import { Context } from 'vm';
import { CtxUser } from 'src/utils/user.decorator';

@Resolver('NativeAuthenticationResult')
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation()
    register(@Args('input') input: CreateUserInput) {
        return this.userService.createUserAccount(input)
    }
    @Mutation()
    login(@Args('input') input: LoginInput) {
        return this.userService.login(input)
    }
    @ResolveField()
    __resolveType(obj: any, context, info) {
        if (obj.user) {
            return 'UserWithToken'
        }
        return 'InvalidCredentialsError'
    }

    // @UseGuards(JwtAuthGuard)
    // @Query()
    // me(@Ctx() ctx: Context) {
    //     return ctx;
    // }
    @UseGuards(TokenAuthGuard)
    @Query()
    // async me(): Promise<any> {
    //     console.log(req)
    //     // console.log(context.switchToHttp())

    //     // this.userService.profile()
    // }
    async me(@Context('user') user: User,@Request() request: any) {
        console.log("ABC", request)
        // console.log("User", user)
        // return this.userService.profile("5fe73ee3313bf24102e23138")
        return user;
    }
}
@Resolver('RegisterUserAccountResult')
export class RegisterResolver {
    constructor(private userService: UserService) {}
    @Mutation()
    register(@Args('input') input: CreateUserInput) {
        return this.userService.createUserAccount(input)
    }
    @ResolveField()
    __resolveType(obj: any, context, info) {
        if (obj.success ) {
            return 'Success'
        }
        return 'RegexNotMatchError'
    }
}