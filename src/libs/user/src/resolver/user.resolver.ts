import { Resolver, Mutation, Query, Args, ResolveProperty} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { CreateUserInput, RegisterUserAccountResult, Success, RegexNotMatchError } from '../../../../generate-types';

@Resolver('RegisterUserAccountResult')
export class UserResolver {
    constructor(private userService: UserService) {}

    @ResolveProperty()
    __resolveType(obj: any, context, info) {
        if (obj.success ) {
            return 'Success'
        }
        return 'RegexNotMatchError'
    }
    @Mutation()
    register(@Args('input') input: CreateUserInput) {
        return this.userService.createUserAccount(input)
    }
}