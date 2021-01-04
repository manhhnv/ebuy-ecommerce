import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ShippingAddress {
    _id: Types.ObjectId

    @Prop({type: Types.ObjectId, ref: 'User'})
    user: Types.ObjectId

    @Prop({type: String, required: true, default: 'VN'})
    countryCode: string

    @Prop({type: String})
    province: string

    @Prop({type: String})
    city: string

    @Prop({type: String, required: true})
    state: string

    @Prop({type: String, required: true})
    streetLine: string

    @Prop({type: String, default: ''})
    zipCode: string

    @Prop({type: String})
    other: string

    @Prop({type: String, required: true})
    phoneNumber: string

    @Prop({type: String, required: true})
    firstName: string

    @Prop({type: String})
    lastName: string

    @Prop({type: Boolean, default: false})
    defaultAddress: boolean

    @Prop({type: Date, required: true, default: Date.now()})
    createdAt: Date

    @Prop({type: Date, required: true, default: Date.now()})
    updatedAt: Date
}
export const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress)
export type ShippingAddressDocument = ShippingAddress & Document