import {
    Resolver, ResolveField, Query, Mutation,
    Args, Parent, Context
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
import { User } from 'src/generate-types';
import { Order } from '../schema/order.schema';
import { OrderLine } from '../schema/orderLine.schema';
import { ShippingAddress } from 'src/libs/shipping-address/src/schema/shipping-address.schema';
import { ShippingAddressService } from 'src/libs/shipping-address/src/service/shipping-address.service';

@Resolver(() => Order)
export class OrderResolver {
    constructor(
        private orderService: OrderService,
        private shippingAddressService: ShippingAddressService
    ) {}

    @UseGuards(TokenAuthGuard)
    @Mutation()
    async addItemToOrder(
        @Context('user') user: User,
        @Args('variantId') variantId: string,
        @Args('quantity') quantity: number
        )
        {
            const { _id } = user
            return this.orderService.addItemToOrder(_id, variantId, quantity)
        }
    
    @UseGuards(TokenAuthGuard)
    @Query()
    activeOrder(@Context('user') user: User) {
        const {_id} = user
        return this.orderService.getActiveOrder(_id);
    }
    
    @UseGuards(TokenAuthGuard)
    @Mutation()
    async removeItemFromOrder(@Context('user') user: User, @Args('orderLineId') orderLineId: string) {
        const {_id} = user;
        return this.orderService.removeOrderLine(_id, orderLineId);
    }

    @UseGuards(TokenAuthGuard)
    @Mutation()
    incrementOrderItem(@Context('user')user: User ,@Args('orderLineId')orderLineId: string) {
        const {_id} = user;
        return this.orderService.incrementOrderItem(_id, orderLineId)
    }

    @UseGuards(TokenAuthGuard)
    @Mutation()
    decreaseOrderItem(@Context('user') user: User, @Args('orderLineId')orderLineId: string) {
        const {_id} = user;
        return this.orderService.decreaseOrderItem(_id, orderLineId)
    }
    
    @UseGuards(TokenAuthGuard)
    @Mutation()
    setShippingAddressForOrder(@Context('user') user: User, @Args('addressId') addressId: string) {
        const {_id} = user;
        return this.orderService.setShippingAddressForOrder(_id, addressId)
    }

    @ResolveField('lines', returns => [OrderLine])
    async lines(@Parent() order: Order) {
        return await this.orderService.orderLinesByOrderId(order._id)
    }
    @ResolveField('shippingAddress', returns => ShippingAddress)
    async shippingAddress(@Parent() order: Order) {
        return await this.shippingAddressService.getShippingAddressDetail(order.userId, order.shippingAddress)
    }
}