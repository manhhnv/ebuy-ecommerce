import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductVariant, ProductVariantDocument } from './product-variant.schema';

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectModel(ProductVariant.name) private variantModel: Model<ProductVariantDocument>
    )
    {}
    async getVariant(_id: Types.ObjectId): Promise<ProductVariant | undefined> {
        try {
            const variant = await this.variantModel.findById(_id)
            return variant
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
}