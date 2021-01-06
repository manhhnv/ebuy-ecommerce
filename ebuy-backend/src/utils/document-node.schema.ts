import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class DocumentNode {
    _id: Types.ObjectId

    @Prop({type: Date, default: Date.now()})
    createdAt: Date
    
    @Prop({type: Date, default: Date.now()})
    updatedAt: Date
}