import { Resolver, Context, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductPromotionService } from '../service/product-promotion.service';
import { ProductSaleConfig } from 'src/generate-types';

@Resolver()
export class ProductPromotionResolver {
    constructor(private promotionService: ProductPromotionService)
    {}

    @Mutation()
    setProductPromotion(@Args('id') id: string, @Args('config') config: ProductSaleConfig) {
        return this.promotionService.addPromotionForProduct(id, config)
    }
}