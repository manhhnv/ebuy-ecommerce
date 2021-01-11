import { Resolver } from '@nestjs/graphql';
import { CouponService } from '../service/coupon.service';
@Resolver()
export class CouponResolver {
    constructor(
        private couponService: CouponService
    ) {

    }
}