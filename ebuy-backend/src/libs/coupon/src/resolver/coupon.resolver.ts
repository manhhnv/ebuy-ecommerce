import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
import { PoliciesGuard } from 'src/libs/policy/policies.guard';
import { CheckPolicies } from 'src/libs/policy/policy.decorator';
import { CouponService } from '../service/coupon.service';
import { CreateCoupon } from 'src/libs/policy/coupon.policy';
import { CouponConfig } from 'src/generate-types';
@Resolver()
export class CouponResolver {
    constructor(
        private couponService: CouponService
    ) {
        
    }
    @Mutation()
    @UseGuards(TokenAuthGuard)
    @CheckPolicies(new CreateCoupon())
    async createCoupon(@Args('config') config: CouponConfig) {
        return this.couponService.createCoupon(config)
    }
}