import { Injectable } from '@nestjs/common';
import { User } from 'src/libs/user/src/schema/user.schema';
import { Coupon } from 'src/libs/coupon/src/schema/coupon.schema';
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Action } from './action.enum';

export type Subjects = typeof Coupon | typeof User | Coupon | User | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
        Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all')
        } else {
            can(Action.Read, 'all')
        }
        return build()
    }
}
