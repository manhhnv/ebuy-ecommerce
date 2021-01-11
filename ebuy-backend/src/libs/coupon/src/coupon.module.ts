import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponResolver } from './resolver/coupon.resolver';
import { Coupon, CouponSchema } from './schema/coupon.schema';
import { CouponService } from './service/coupon.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Coupon.name, schema: CouponSchema}
        ])
    ],
    providers: [
        CouponService, CouponResolver
    ],
    exports: [CouponService]
})
export class CouponModule {}