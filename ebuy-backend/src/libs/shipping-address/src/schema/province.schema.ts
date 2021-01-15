import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Province {
    
    _id: Types.ObjectId

    @Prop({type: Number, required: true})
    identify: number

    @Prop({type: String, required: true})
    name: string

}
export type ProvinceDocument = Document & Province;
export const ProvinceSchema = SchemaFactory.createForClass(Province)