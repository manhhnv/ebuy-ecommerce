import {
    Injectable, InternalServerErrorException,
    HttpException, HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductPromotion, ProductPromotionDocument } from '../schema/product-promotion.schema';
import { ProductSaleConfig } from 'src/generate-types';
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
            const promotion = new this.productPromotionModel({
                product: Types.ObjectId(productId),
                discount: config.discount,
                percentage: config.percentage
            })
            await promotion.save()
            return product
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
            console.log(productId)
            if (!promotion) {
                throw new HttpException('Promotion not found', HttpStatus.BAD_REQUEST)
            }
            return promotion;
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing requesr')
        }
    }
}