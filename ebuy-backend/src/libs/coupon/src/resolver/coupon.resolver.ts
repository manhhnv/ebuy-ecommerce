import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { TokenAuthGuard } from 'src/shared/auth/src/guard/token-auth.guard';
import { PoliciesGuard } from 'src/shared/policy/policies.guard';
import { CheckPolicies } from 'src/shared/policy/policy.decorator';
import { CouponService } from '../service/coupon.service';
import { CouponPolicy } from 'src/shared/policy/permission/coupon.policy';
import { CouponConfig } from 'src/generate-types';
import { Action } from 'src/shared/casl/action.enum';
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