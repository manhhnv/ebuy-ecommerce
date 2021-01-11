import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from '../schema/coupon.schema';
@Injectable()
export class CouponService {
    constructor(
        @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    ) {

    }
}