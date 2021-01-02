import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductVariant, ProductVariantDocument } from '../schema/product-variant.schema';
import { Product } from '../schema/product.schema';
import { CreateProductVariantInput } from '../../../../generate-types';

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectModel(ProductVariant.name) private variantModel: Model<ProductVariantDocument>
    )
    {}
    async getVariant(_id: Types.ObjectId): Promise<ProductVariant | undefined> {
        try {
            // console.log(_id)
            const variant = await this.variantModel.findById(_id).populate(`${Product.name}`);
            // console.log(variant)
            return variant
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
    async variantsByProductId(productId: Types.ObjectId | string) {
        try {
            const variants = await this.variantModel.find({productId: `${productId}`})
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