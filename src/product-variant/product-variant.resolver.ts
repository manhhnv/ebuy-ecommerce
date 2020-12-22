import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ProductVariant } from './product-variant.schema';
import { ProductVariantService } from './product-variant.service';

@Resolver(() => ProductVariant)
export class ProductVariantResolver {
    constructor(private variantService: ProductVariantService) {}

    @Query()
    productVariant(@Args('_id') _id: Types.ObjectId) {
        return this.variantService.getVariant(_id)
    }
}