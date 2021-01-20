import {
    ResolveField, Resolver, Mutation,
    Args, Query, Context
} from '@nestjs/graphql';
import { ShippingMethod } from '../schema/shipping-method.schema';
import { ShippingMethodService } from '../service/shipping-method.service';

@Resolver('ShippingMethod')
export class ShippingMethodResolver {
    constructor(
        private shippingMethodService: ShippingMethodService
    ) {

    }

    @Query()
    eligibleShippingMethod() {
        
    }
}