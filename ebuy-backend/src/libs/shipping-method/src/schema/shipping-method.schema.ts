import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocumentNode } from '../../../../utils/document-node.schema';
import { ShippingType } from '../../../../generate-types';

@Schema()
export class ShippingMethod extends DocumentNode {

    @Prop({type: String, required: true, default: ''})
    name: string

    @Prop({type: ShippingType, required: true, default: ShippingType.StandardExpress})
    shippingType: ShippingType

    @Prop({type: String, required: true})
    company: string

    @Prop({type: String, required: true})
    licenseNumber: string

    @Prop({type: Boolean, required: true, default: true})
    active: boolean

}
export type ShippingMethodDocument = Document & ShippingMethod;
export const ShippingMethodSchema = SchemaFactory.createForClass(ShippingMethod);