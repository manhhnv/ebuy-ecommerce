import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { TypeAsset } from '../../../../generate-types';
import { ProductVariant } from './product-variant.schema';

@ObjectType()
@Schema()
export class Asset {
    @Field(() => ID)
    _id: Types.ObjectId

    @Field(() => ID)
    @Prop(() => Types.ObjectId)
    variantId: string

    @Field(() => String)
    @Prop({type: String, required: false, ref: ProductVariant.name})
    name: string

    @Field(() => TypeAsset)
    @Prop()
    type: TypeAsset

    @Field(() => Int)
    @Prop()
    fileSize: number

    @Field(() => Int)
    @Prop()
    width: number

    @Field(() => Int)
    @Prop()
    height: number

    @Field(() => String)
    @Prop()
    preview: string

    @Field(() => Date)
    @Prop({default: Date.now()})
    createdAt: Date;

    @Field(() => Date)
    @Prop({default: Date.now()})
    updatedAt: Date;
}

export type AssetDocument = Asset & Document
export const AssetSchema = SchemaFactory.createForClass(Asset)