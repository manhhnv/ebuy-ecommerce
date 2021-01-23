import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';

@Schema()
export class SubCollection extends DocumentNode {

    @Prop({type: String, required: true})
    name: string

    @Prop({type: Types.ObjectId, ref: 'Collection'})
    collect: Types.ObjectId

    @Prop({type: Boolean, required: true, default: true})
    active: boolean

}
export type SubCollectionDocument = SubCollection & Document;
export const SubCollectionSchema = SchemaFactory.createForClass(SubCollection)