import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';

@Schema()
export class Order extends DocumentNode{

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
    
    @Prop({type: Types.ObjectId, ref: 'ShippingAddress', default: null})
    shippingAddress: Types.ObjectId
    
}

export const OrderSchema = SchemaFactory.createForClass(Order)
export type OrderDocument = Order & Document