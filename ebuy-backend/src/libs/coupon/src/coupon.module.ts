import { Module } from '@nestjs/common';
import { CouponResolver } from './resolver/coupon.resolver';
import { CouponService } from './service/coupon.service';

@Module({
    imports: [],
    providers: [
        CouponService, CouponResolver
    ],
    exports: [CouponService]
})
export class CouponModule {}