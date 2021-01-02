import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

    @Prop({type: Date, required: true, default: Date.now()})
    createdAt: Date

    @Prop({type: Date, required: true, default: Date.now()})
    updatedAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
export type OrderDocument = Order & Document