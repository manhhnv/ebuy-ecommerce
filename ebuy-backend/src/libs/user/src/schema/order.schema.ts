import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order {
    _id: Types.ObjectId;

    @Prop({type: Boolean, required: true, default: true})
    status: boolean

    @Prop({type: String, required: true})
    userId: string

    @Prop({type: String, required: true, default: 'Adding Item'})
    state: string

    @Prop({type: Number, required: true, default: 0})
    totalQuantity: number

    @Prop({type: Number, required: true, default: 0})
    subTotal: number
    
    @Prop({type: Number, required: true, default: 0})
    total: number

    @Prop({type: String, required: true, default: 'VN'})
    countryCode: string

    @Prop({type: String, required: true, default: 'VND'})
    currency: string
    
    // @Prop(raw({
    //     _id: {type: Types.ObjectId || String},
    //     countryCode: {type: String},
    //     city: {type: String},
    //     state: {type: String},
    //     streetLine: {type: String},
    //     zipCode: {type: String},
    //     other: {type: String},
    //     phoneNumber: {type: String},
    //     firstName: {type: String},
    //     lastName: {type: String},
    //     defaultAddress: {type: Boolean},
    //     createdAt: {type: Date},
    //     updatedAt: {type: Date}
    // }))
    @Prop({type: Types.ObjectId, ref: 'ShippingAddress', default: null})
    shippingAddress: string
    
    @Prop({type: Date, required: true, default: Date.now()})
    createdAt: Date

    @Prop({type: Date, required: true, default: Date.now()})
    updatedAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
export type OrderDocument = Order & Document