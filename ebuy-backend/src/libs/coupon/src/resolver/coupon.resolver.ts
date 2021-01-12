import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
import { PoliciesGuard } from 'src/libs/policy/policies.guard';
import { CheckPolicies } from 'src/libs/policy/policy.decorator';
import { CouponService } from '../service/coupon.service';
import { CouponPolicy } from 'src/libs/policy/permission/coupon.policy';
import { CouponConfig } from 'src/generate-types';
import { Action } from 'src/libs/casl/action.enum';
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

    @Query()
    @UseGuards(TokenAuthGuard, PoliciesGuard)
    @CheckPolicies(new CouponPolicy(Action.Read))
    getAllCoupon() {
        return this.couponService.getListCoupon()
    }
}