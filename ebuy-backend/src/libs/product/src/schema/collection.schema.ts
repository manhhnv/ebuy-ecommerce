import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';

@Schema()
export class Collection extends DocumentNode{

    @Prop({type: String, required: true, maxlength: 20})
    name: string

    @Prop({type: Number, default: 0})
    totalSubCollection: number

    @Prop({type: Boolean, required: true, default: true})
    active: boolean

    @Prop({type: Boolean, required: true, default: false})
    defaultCollection: boolean

}
export type CollectionDocument = Collection & Document
export const CollectionSchema = SchemaFactory.createForClass(Collection)