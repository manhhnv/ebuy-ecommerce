import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class OrderLine {
    _id: Types.ObjectId;

    @Prop({type: String, required: true})
    productVariantId: string

    @Prop({type: Types.ObjectId || String, required: true})
    orderId: string

    @Prop({type: Number, required: true})
    quantity: Number

    @Prop({type: Number, required: true})
    total: number
    
    @Prop({type: Date, required: true, default: Date.now()})
    createdAt: Date

    @Prop({type: Date, required: true, default: Date.now()})
    updatedAt: Date
}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);
export type OrderLineDocument = OrderLine & Document