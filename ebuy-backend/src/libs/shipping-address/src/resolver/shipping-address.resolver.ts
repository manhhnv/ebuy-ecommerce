import {
    Resolver, Mutation, Query,
    Args, Context
} from '@nestjs/graphql';
import { ShippingAddress } from '../schema/shipping-address.schema';
import { UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from '../../../../shared/auth/src/guard/token-auth.guard';
import { User, ShippingAddressArgs, UpdateShippingAddressInput } from 'src/generate-types';
import { ShippingAddressService } from '../service/shipping-address.service';
import { Types } from 'mongoose';
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
    
    @UseGuards(TokenAuthGuard)
    @Query()
    getShippingAddressDetail(@Context('user') user: User, @Args('id')id: string) {
        const { _id } = user;
        return this.shippingAddressService.getShippingAddressDetail(_id, Types.ObjectId(id))
    }

    @UseGuards(TokenAuthGuard)
    @Query()
    getDefaultShippingAddress(@Context('user') user: User) {
        const {_id} = user
        return this.shippingAddressService.getDefaultAddress(_id)
    }

    @UseGuards(TokenAuthGuard)
    @Mutation()
    updateShippingAddress(
        @Context('user') user: User,
        @Args('id') id: string,
        @Args('input') input: UpdateShippingAddressInput,
        ) {
        const { _id } = user;
        return this.shippingAddressService.updateShippingAddress(_id, id, input)
    }

    @Query()
    eligibleProvince() {
        return this.shippingAddressService.eligibleProvince()
    }

    @Query()
    eligibleState(@Args('provinceId') provinceId: number) {
        return this.shippingAddressService.eligibleState(provinceId)
    }
}