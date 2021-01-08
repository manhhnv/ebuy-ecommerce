import { Resolver, Mutation, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../service/product.service';
import { CreateProductInput } from '../../../../generate-types';
import { Product } from '../schema/product.schema';
import { ProductVariantService } from '../service/product-variant.service';
import { ProductPromotionService } from '../service/product-promotion.service';
import { ProductSaleConfig } from 'src/generate-types';
import { ProductVariant } from '../schema/product-variant.schema';
import { ProductPromotion } from '../schema/product-promotion.schema';
@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private productService: ProductService,
        private variantService: ProductVariantService,
        private promotionService: ProductPromotionService
        ) {}
    @Query()
    product(@Args('_id') _id: string) {
        return this.productService.findProductById(_id)
    }
    
    @Mutation()
    setProductPromotion(@Args('_id') _id: string, @Args('config') config: ProductSaleConfig) {
        return this.promotionService.addPromotionForProduct(_id, config)
    }

    @Mutation()
    removeProductPromotion(@Args('_id') _id: string) {
        return this.promotionService.remove(_id)
    }

    @Mutation()
    updateProductPromotion(@Args('_id') _id: string, @Args('config') config: ProductSaleConfig) {
        return this.promotionService.update(_id, config)
    }

    @ResolveField('sale', returns => ProductPromotion)
    async sale(@Parent() product: Product) {
        return await this.promotionService.promotionDetail(product._id)
    }

    @ResolveField('variants', returns => [ProductVariant])
    async variants(@Parent() product: Product) {
        const { _id } = product;
        return await this.variantService.variantsByProductId(_id)
    }
    @Query()
    products(@Args('slug') slug: string) {
        return this.productService.getAllProductBySlug(slug)
    }
    @Mutation()
    createProduct (@Args('input') input: CreateProductInput) {
        return this.productService.createProduct(input)
    }
}