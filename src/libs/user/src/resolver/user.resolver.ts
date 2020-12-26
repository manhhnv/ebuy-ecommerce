import { Resolver, Mutation, Query, Args, ResolveField} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { CreateUserInput, LoginInput } from 'src/generate-types';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/libs/auth/src/service/jwt-auth.guard';

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
    // me(@Request)
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