import {
    Resolver, Mutation, Query,
    Args, Context
} from '@nestjs/graphql';
import { ShippingAddress } from '../schema/shipping-address.schema';
import { UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
import { User, ShippingAddressArgs } from 'src/generate-types';
import { ShippingAddressService } from '../service/shipping-address.service';
@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {

    constructor(private shippingAddressService: ShippingAddressService) {}

    @UseGuards(TokenAuthGuard)
    @Mutation()
    addShippingAddress(@Context('user') user: User, @Args('input') input: ShippingAddressArgs) {
        const { _id } = user;
        return this.shippingAddressService.createShippingAddress(_id, input)
    }
    
    @UseGuards(TokenAuthGuard)
    @Mutation()
    removeShippingAddress(@Context('user') user: User, @Args('id') id: string) {
        const { _id } = user;
        return this.shippingAddressService.removeShippingAddress(_id, id)
    }

    @UseGuards(TokenAuthGuard)
    @Query()
    eligibleShippingAddress(@Context('user') user: User) {
        const { _id } = user;
        return this.shippingAddressService.listAShippingAddress(_id)
    }

    @UseGuards(TokenAuthGuard)
    @Mutation()
    setAsDefaultAddress(@Context('user') user: User, @Args('id') id: string) {
        const { _id } = user;
        return this.shippingAddressService.setAsDefaultAddress(_id, id)
    }
    
}