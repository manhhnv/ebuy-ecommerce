import { Action } from '../../../shared/casl/action.enum';
import { AppAbility } from '../../../shared/casl/casl-ability.factory';
import { Coupon } from '../../../libs/coupon/src/schema/coupon.schema';
import { IPolicyHandler } from '../policy.config';
export class CouponPolicy implements IPolicyHandler{
    
    private permission: Action;
    private target: Coupon
    constructor(_permission: Action) {
        this.permission = _permission;
    }
    handle(ability: AppAbility): boolean {
        return ability.can(this.permission, this.target)
    }
}