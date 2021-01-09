import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocumentNode } from 'src/utils/document-node.schema';

@Schema()
export class Collection extends DocumentNode{

    @Prop({type: String, required: true, maxlength: 20})
    name: string

    @Prop({type: Number, default: 0})
    totalSubCollection: number

    @Prop({type: [String]})
    subCollections: string[]

    @Prop({type: Boolean, required: true, default: true})
    active: boolean

}
export type CollectionDocument = Collection & Document
export const CollectionSchema = SchemaFactory.createForClass(Collection)