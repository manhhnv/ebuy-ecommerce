import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ShippingMethod, ShippingMethodDocument } from "../schema/shipping-method.schema";

@Injectable()
export class ShippingMethodService {
    constructor(
        @InjectModel(ShippingMethod.name) private shippingMethodModel: Model<ShippingMethodDocument>,
        ) {

    }
    
}