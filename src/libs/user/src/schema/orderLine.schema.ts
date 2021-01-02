import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class OrderLine {
    _id: Types.ObjectId;

    @Prop({type: Types.ObjectId, required: true, ref: 'ProductVariant'})
    productVariant: Types.ObjectId

    @Prop({type: Types.ObjectId, required: true, ref: 'Order'})
    orderId: Types.ObjectId

    @Prop({type: Number, required: true})
    quantity: number

    @Prop({type: Number, required: true})
    total: number
    
    @Prop({type: Date, required: true, default: Date.now()})
    createdAt: Date

    @Prop({type: Date, required: true, default: Date.now()})
    updatedAt: Date
}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);
export type OrderLineDocument = OrderLine & Document