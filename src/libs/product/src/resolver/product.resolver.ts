import { Resolver, Mutation, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../service/product.service';
import { CreateProductInput } from '../../../../generate-types';
import { Product } from '../schema/product.schema';
import { ProductVariantService } from '../service/product-variant.service';
@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private productService: ProductService,
        private variantService: ProductVariantService
        ) {}
    @Query()
    product(@Args('_id') _id: string) {
        return this.productService.findProductById(_id)
    }
    @ResolveField()
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