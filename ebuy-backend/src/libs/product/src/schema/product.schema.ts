import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductVariant } from './product-variant.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    _id: Types.ObjectId;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    slug: string;

    @Prop({default: true})
    active: boolean

    @Prop({required: true, default: 0})
    inStock: number;

    @Prop({default: Date.now()})
    createdAt: Date;

    @Prop({default: Date.now()})
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);