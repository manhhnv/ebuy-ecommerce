import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ProductVariant } from '../schema/product-variant.schema';
import { ProductVariantService } from '../service/product-variant.service';
import { CreateProductVariantInput } from '../../../../generate-types';
@Resolver(() => ProductVariant)
export class ProductVariantResolver {
    constructor(
        private variantService: ProductVariantService,
        ) {}

    @Query()
    productVariant(@Args('_id') _id: Types.ObjectId) {
        return this.variantService.getVariant(_id)
    }
    
    @Mutation()
    createProductVariant(@Args('input') input: CreateProductVariantInput) {
        return this.variantService.createVariant(input)
    }
}