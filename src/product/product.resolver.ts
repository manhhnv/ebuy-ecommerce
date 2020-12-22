import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from '../generate-types';
import { Product } from './product.schema';
@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) {}
    @Query()
    product(@Args('_id') _id: string) {
        return this.productService.findProductById(_id)
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