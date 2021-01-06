import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Types, Document } from 'mongoose';
import { Product } from './product.schema';

@ObjectType()
@Schema()
export class ProductVariant {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => String)
    @Prop( {type: Types.ObjectId, ref: Product.name})
    productId: Types.ObjectId

    @Field(() => Int)
    @Prop()
    inStock: number

    @Field(() => Boolean)
    @Prop({default: true})
    active: boolean

    @Field(() => String)
    @Prop({required: true})
    sku: string
    
    @Field(() => String)
    @Prop({required: true})
    name: string

    @Field(() => Int)
    @Prop({required: true})
    price: number

    @Field(() => Date)
    @Prop({default: Date.now()})
    createdAt: Date

    @Field(() => Date)
    @Prop({default: Date.now})
    updatedAt: Date
}

export type ProductVariantDocument = ProductVariant & Document
export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant)