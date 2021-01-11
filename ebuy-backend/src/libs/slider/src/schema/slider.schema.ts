import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocumentNode } from 'src/utils/document-node.schema';
import { TypeAsset } from 'src/generate-types';

@Schema()
export class Slider extends DocumentNode{
    
    @Prop({type: String, required: true, default: null})
    title: string

    @Prop({type: String, required: true, default: null})
    subTitle: string

    @Prop({type: String, required: true, default: null})
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