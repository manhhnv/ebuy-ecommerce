import {
    Injectable, HttpException, HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Coupon, CouponDocument } from '../schema/coupon.schema';
import { CouponConfig, ListCoupon } from '../../../../generate-types';
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
    async removeCoupon(couponId: string): Promise<ListCoupon> {
        try {
            await this.couponModel.findByIdAndDelete(Types.ObjectId(couponId))
            return this.getListCoupon()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async updateCoupon(couponId: string, config: CouponConfig): Promise<ListCoupon> {
        try {
            await this.couponModel.findByIdAndUpdate(
                Types.ObjectId(couponId),
                config
            )
            return this.getListCoupon()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async expiredCoupon(couponId: string): Promise<Coupon> {
        try {
            console.log(new Date())
            const coupon = await this.couponModel.findOne({
                _id: Types.ObjectId(couponId),
                maxNumber: {$gt: 0},
                endDate: {$gte: new Date()}
            })
            console.log("COUPON", coupon)
            return coupon;
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'Error')
        }
    }
}