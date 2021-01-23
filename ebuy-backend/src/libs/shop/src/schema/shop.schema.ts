import { IsEmail, ValidateNested, IsPhoneNumber } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';
import { Document, Types } from 'mongoose';

@Schema()
export class Shop extends DocumentNode {

    @Prop({ type: String, required: true, default: '' })
    brandName: string;

    @IsPhoneNumber('VN')
    @ValidateNested({ each: true })
    @Prop({ type: [String], required: true, default: [] })
    phoneNumbers: string[];

    @IsEmail()
    @ValidateNested({ each: true })
    @Prop({ type: [String], required: true, default: [] })
    shopEmails: string[]

    @Prop({type: Types.ObjectId, required: true, ref: 'Province'})
    province: Types.ObjectId

    @Prop({type: Types.ObjectId, required: true, ref: 'State'})
    state: Types.ObjectId;

    @Prop({type: String, required: true, default: ''})
    streetLine1: string;

    @Prop({type: String, required: false, default: ''})
    streetLine2: string

    @Prop({type: Types.ObjectId, ref: 'User'})
    owner: Types.ObjectId

    @Prop({ type: String,  required: true, default: "http://0.0.0.0:3000/shop/image/default-shop.jpg" })
    avatar: string

    @Prop({ type: String, required: true, default: "http://0.0.0.0:3000/shop/image/default-shop-banner.jpg" })
    banner: string

    @Prop({ type: String, required: true})
    metaDescription: string

    @Prop({ type: String, required: true})
    metaKeyword: string

}
export type ShopDocument = Document & Shop;
export const ShopSchema = SchemaFactory.createForClass(Shop);