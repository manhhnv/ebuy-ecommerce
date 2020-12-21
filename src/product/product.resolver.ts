import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from '../generate-types';
import { Product } from './product.schema';
@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) {}
    @Query()
    async product(@Args() id: any) {
        return id;
    }

    @Mutation()
    async createProduct (@Args('input') input: CreateProductInput) {
        return this.productService.createProduct(input)
    }
}