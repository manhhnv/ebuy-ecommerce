import { Resolver, Mutation, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../service/product.service';
import { CreateProductInput } from '../../../../generate-types';
import { Product } from '../schema/product.schema';
import { ProductVariantService } from '../service/product-variant.service';
import { ProductPromotionService } from '../service/product-promotion.service';
import { ProductSaleConfig } from '../../../../generate-types';
import { ProductVariant } from '../schema/product-variant.schema';
import { ProductPromotion } from '../schema/product-promotion.schema';
import { UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../../../../shared/policy/policies.guard';
import { CheckPolicies } from '../../../../shared/policy/policy.decorator';
import { ProductPolicy } from '../../../../shared/policy/permission/product.policy';
import { Action } from '../../../../shared/casl/action.enum';
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

    @Query()
    products(@Args('slug') slug: string) {
        return this.productService.getAllProductBySlug(slug)
    }
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ProductPolicy(Action.Manage))
    @Mutation()
    createProduct (@Args('input') input: CreateProductInput) {
        return this.productService.createProduct(input)
    }
    @ResolveField('variants')
    async variants(@Parent() product: Product) {
        const { _id } = product;
        return await this.variantService.variantsByProductId(_id)
    }
}