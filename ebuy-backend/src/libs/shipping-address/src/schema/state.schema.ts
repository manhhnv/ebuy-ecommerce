import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class State {

    _id: Types.ObjectId

    @Prop({type: Number, required: true})
    provinceId: number

    @Prop({type: String, required: true})
    name: string

}
export type StateDocument = Document & State
export const StateSchema = SchemaFactory.createForClass(State)