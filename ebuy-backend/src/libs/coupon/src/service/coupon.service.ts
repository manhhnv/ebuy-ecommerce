import {
    Injectable, HttpException, HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from '../schema/coupon.schema';
import { CouponConfig } from 'src/generate-types';
import { ListCoupon } from 'src/generate-types';
@Injectable()
export class CouponService {
    constructor(
        @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    ) {

    }
    async getListCoupon(): Promise<ListCoupon> {
        try {
            const coupons = await this.couponModel.find();
            return {
                items: coupons,
                totalItems: coupons.length
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async createCoupon(config: CouponConfig): Promise<ListCoupon> {
        try {
            const coupon = new this.couponModel(config)
            await coupon.save()
            return this.getListCoupon()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
}