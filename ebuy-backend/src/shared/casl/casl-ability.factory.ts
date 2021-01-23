import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../../libs/user/src/schema/user.schema';
import { Coupon } from '../../libs/coupon/src/schema/coupon.schema';
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Action } from './action.enum';
import { Order } from '../../libs/user/src/schema/order.schema';
import { Product } from '../../libs/product/src/schema/product.schema';
import { Slider } from '../../libs/slider/src/schema/slider.schema';
import { Shop } from '../../libs/shop/src/schema/shop.schema';

export type Subjects =
    typeof Coupon | 
    typeof User | Coupon | User | 
    typeof Order | 
    typeof Product |
    typeof Slider |
    typeof Shop |
    'all';
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
            can(Action.Manage, Order)
        }
        return build()
    }
}
