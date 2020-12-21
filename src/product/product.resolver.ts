import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

@Resolver('Product')
export class ProductResolver {
    @Query()
    async product(@Args() id: any) {
        return id;
    }

    @Mutation()
    async createProduct (@Args() input: any) {
        return input;
    }
}