import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { TokenAuthGuard } from '../../../../shared/auth/src/guard/token-auth.guard';
import { PoliciesGuard } from '../../../../shared/policy/policies.guard';
import { CheckPolicies } from '../../../../shared/policy/policy.decorator';
import { CouponService } from '../service/coupon.service';
import { CouponPolicy } from '../../../../shared/policy/permission/coupon.policy';
import { CouponConfig } from '../../../../generate-types';
import { Action } from '../../../../shared/casl/action.enum';
@Resolver()
export class CouponResolver {
    constructor(
        private couponService: CouponService
    ) {
        
    }
    @Mutation()
    @UseGuards(TokenAuthGuard, PoliciesGuard)
    @CheckPolicies(new CouponPolicy(Action.Manage))
    createCoupon(@Args('config') config: CouponConfig) {
        return this.couponService.createCoupon(config)
    }

    @Mutation()
    @UseGuards(TokenAuthGuard, PoliciesGuard)
    @CheckPolicies(new CouponPolicy(Action.Manage))
    removeCoupon(@Args('_id') _id: string) {
        return this.couponService.removeCoupon(_id)
    }
    
    @Mutation()
    @UseGuards(TokenAuthGuard, PoliciesGuard)
    @CheckPolicies(new CouponPolicy(Action.Manage))
    updateCoupon(@Args('_id')_id, @Args('config') config: CouponConfig) {
        return this.couponService.updateCoupon(_id, config)
    }

    @Query()
    @UseGuards(TokenAuthGuard, PoliciesGuard)
    @CheckPolicies(new CouponPolicy(Action.Read))
    getAllCoupon() {
        return this.couponService.getListCoupon()
    }
}