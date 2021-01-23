import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DocumentNode } from "../../../../utils/document-node.schema";

@Schema()
export class Coupon extends DocumentNode {

    @Prop({type: String, required: true, default: 'COUPON_CODE'})
    code: string

    @Prop({type: Number, required: true, default: 10})
    percentage: number

    @Prop({type: Number, required: true, default: 15})
    maxDiscount: number

    @Prop({type: Date, required: true, default: Date.now()})
    startDate: Date

    @Prop({type: Date, required: true, default: Date.now()})
    endDate: Date

    @Prop({type: Number, required: true, default: 10})
    maxNumber: number

    @Prop({type: Number, required: true, default: 100})
    orderCondition: number
}

export const CouponSchema = SchemaFactory.createForClass(Coupon)
export type CouponDocument = Document & Coupon