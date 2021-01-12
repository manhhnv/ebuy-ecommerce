import { Action } from '../casl/action.enum';
import { AppAbility } from '../casl/casl-ability.factory';
import { Coupon } from '../coupon/src/schema/coupon.schema';
import { IPolicyHandler } from './policy.config';

export class CreateCoupon implements IPolicyHandler {
    handle(ability: AppAbility): boolean {
        return ability.can(Action.Manage, Coupon)
    }
   
}