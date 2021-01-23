import { 
    Resolver, Mutation, Query, Args,
    ResolveField, Context,
} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { CreateUserInput, LoginInput, User } from '../../../../generate-types';
import { UseGuards, Request, Req, Session, UseInterceptors, UploadedFile} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../shared/auth/src/service/jwt-auth.guard';
import { TokenAuthGuard } from '../../../../shared/auth/src/guard/token-auth.guard';
import { CtxUser } from '../../../../utils/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Mutation()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file) {
        console.log(file)
    }
}