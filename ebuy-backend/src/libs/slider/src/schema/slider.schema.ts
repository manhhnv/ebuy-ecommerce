import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';
import { TypeAsset } from '../../../../generate-types';

@Schema()
export class Slider extends DocumentNode{
    
    @Prop({type: String, required: true, default: ''})
    title: string

    @Prop({type: String, required: true, default: ''})
    subTitle: string

    @Prop({type: String, default: ''})
    url: string

    @Prop({type: Number, required: true, default: 0})
    width: number

    @Prop({type: Number, required: true, default: 0})
    height: number

    @Prop({type: String, required: true, default: ''})
    typeAsset: TypeAsset
}
export type SliderDocument = Document & Slider
export const SliderSchema = SchemaFactory.createForClass(Slider)