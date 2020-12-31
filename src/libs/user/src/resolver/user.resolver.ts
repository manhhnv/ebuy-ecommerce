import { Resolver, Mutation, Query, Args, ResolveField, Context,} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { CreateUserInput, LoginInput, User } from 'src/generate-types';
import { UseGuards, Request, Req, Session} from '@nestjs/common';
import { JwtAuthGuard } from 'src/libs/auth/src/service/jwt-auth.guard';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
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

    @UseGuards(TokenAuthGuard)
    @Query()
    async me(@Context('user') user: User) {
        const { _id } = user;
        return this.userService.profile(_id);
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