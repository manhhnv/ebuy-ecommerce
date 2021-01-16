import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductVariant, ProductVariantDocument } from '../schema/product-variant.schema';
import { Product } from '../schema/product.schema';
import { CreateProductVariantInput } from '../../../../generate-types';

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectModel(ProductVariant.name) private variantModel: Model<ProductVariantDocument>
    ) { }
    async getVariant(_id: Types.ObjectId): Promise<ProductVariant | undefined> {
        try {
            const variant = await this.variantModel.findById(_id).populate(`${Product.name}`);
            return variant
        }
        catch (e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
    async variantsByProductId(productId: Types.ObjectId | string) {
        try {
            const variants = await this.variantModel.find({ productId: productId })
            return variants;
        }
        catch (e) {
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
        catch (e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
    async uploadVariantImage(_id: string, previewURL: string) {
        const variant = await this.variantModel.findById(_id)
        if (!variant) {
            throw new HttpException('Product variant not found', HttpStatus.BAD_REQUEST)
        }
        else {
            return await this.variantModel.findByIdAndUpdate(
                {
                    _id: Types.ObjectId(_id)
                },
                {
                    preview: previewURL
                },
                {
                    new: true
                }
            )
        }
    }
    async listProductVariants(productId: Types.ObjectId): Promise<any> {
        try {
            const variants = await this.variantModel.find({
                productId: productId
            })
            return {
                variants: variants,
                totalItems: variants.length
            }
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'Error')
        }
    }
    async addProductVariant(
        productId: string, inStock: number,
        sku: string, name: string, price: number,
        active?: boolean, color?: string,
        width?: number, height?: number, weight?: number, preview?: string
    ): Promise<ProductVariant> {
        try {
            const variant = new this.variantModel();
            variant.productId = Types.ObjectId(productId);
            variant.inStock = inStock;
            variant.active = active;
            variant.sku = sku;
            variant.name = name;
            variant.price = price;
            variant.type = "IMAGE";
            variant.color = color;
            variant.width = width;
            variant.height = height;
            variant.weight = weight;
            variant.preview = preview;
            await variant.save()
            return await this.listProductVariants(Types.ObjectId(productId))
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async updateProductVariant(
        variantId: string, inStock: number,
        sku: string, name: string, price: number,
        active?: boolean, color?: string,
        width?: number, height?: number, weight?: number, preview?: string
    ): Promise<ProductVariant> {

        try {
            const olderDocument = await this.variantModel.findById(variantId)
            const variant = await this.variantModel.findByIdAndUpdate(variantId, {
                $set: {
                    inStock: inStock,
                    sku: sku,
                    name: name,
                    price: price,
                    active: active,
                    color: color,
                    width: width,
                    height: height,
                    weight: weight,
                    preview: preview || olderDocument.preview
                },
            }, {
                new: true
            })
            return await this.listProductVariants(variant.productId)
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
}