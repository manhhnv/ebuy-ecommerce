import { Resolver, Mutation, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ProductVariantService } from '../service/product-variant.service';
import { ProductVariant } from '../schema/product-variant.schema';
import { ProductService } from '../service/product.service';
@Resolver(() => ProductVariant)
export class ProductVariantResolver {
    constructor(
        private variantService: ProductVariantService,
        protected productService: ProductService
        ) {}

    @Query()
    productVariant(@Args('_id') _id: Types.ObjectId) {
        return this.variantService.getVariant(_id)
    }

    @ResolveField()
    async product(@Parent() variant: ProductVariant) {
        const { productId } = variant;
        return await this.productService.findProductById(productId)
    }
    
}