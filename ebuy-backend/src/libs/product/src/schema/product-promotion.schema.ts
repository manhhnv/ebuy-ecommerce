import { Type } from '@nestjs/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';

@Schema()
export class ProductPromotion extends DocumentNode{

    @Prop({type: Types.ObjectId, ref: 'Product'})
    product: Types.ObjectId

    @Prop({type: Number, required: true, default: 10})
    discount: number

    @Prop({type: Number, required: true, default: 10})
    percentage: number
}

export type ProductPromotionDocument = ProductPromotion & Document ;
export const ProductPromotionSchema = SchemaFactory.createForClass(ProductPromotion)