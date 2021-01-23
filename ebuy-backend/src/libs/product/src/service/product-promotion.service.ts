import {
    Injectable, InternalServerErrorException,
    HttpException, HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductPromotion, ProductPromotionDocument } from '../schema/product-promotion.schema';
import { ProductSaleConfig } from '../../../../generate-types';
import { ProductService } from './product.service';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductPromotionService {

    constructor(
        @InjectModel(ProductPromotion.name) private productPromotionModel: Model<ProductPromotionDocument>,
        private productService: ProductService
    ) {}

    async addPromotionForProduct(productId: string, config: ProductSaleConfig): Promise<Product | undefined> {
        try {
            const product = await this.productService.findProductById(productId)
            if (!product) {
                throw new HttpException('Product not found', HttpStatus.BAD_REQUEST)
            }
            const checkPromotion = await this.productPromotionModel.findOne({
                product: Types.ObjectId(productId)
            })
            if (!checkPromotion) {
                const promotion = new this.productPromotionModel({
                    product: Types.ObjectId(productId),
                    discount: config.discount,
                    percentage: config.percentage
                })
                await promotion.save()
                return product
            }
            throw new HttpException('ERROR: There is only one promotion per product', HttpStatus.BAD_REQUEST)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
    async promotionDetail(productId: Types.ObjectId): Promise<ProductPromotion | undefined> {
        try {   
            const promotion = await this.productPromotionModel.findOne({
                product: productId
            })
            return promotion;
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing requesr')
        }
    }
    async remove(productId: string): Promise<Product | undefined> {
        try {
            await this.productPromotionModel.findOneAndDelete({
                product: Types.ObjectId(productId)
            })
            const product = await this.productService.findProductById(productId)
            return product
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async update(productId: string, config: ProductSaleConfig): Promise<Product | undefined> {
        try {
            const promotion = await this.productPromotionModel.findOne({
                product: Types.ObjectId(productId)
            })
            if (!promotion) {
                throw new HttpException('Promotion not exist on this product', HttpStatus.BAD_REQUEST)
            }
            await promotion.updateOne({
                discount: config.discount,
                percentage: config.percentage
            })
            return this.productService.findProductById(productId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
}