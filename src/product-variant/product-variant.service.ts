import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductVariant, ProductVariantDocument } from './product-variant.schema';
import { CreateProductVariantInput } from '../generate-types';

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
    async variantsByProductId(productId: Types.ObjectId | string) {
        try {
            const variants = await this.variantModel.find({productId: `${productId}`})
            console.log(productId)
            console.log("Variant", variants)
            return variants;
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
    async createVariant(input: CreateProductVariantInput) {
        try {
            const newVariant = new this.variantModel(input)
            const variant = await newVariant.save();
            const { productId } = input
            const variants = await this.variantsByProductId(productId)
            return variants;
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
}