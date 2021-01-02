import {
    Resolver, ResolveField, Query, Mutation,
    Args, Parent, Context
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
import { User } from 'src/generate-types';
import { Order } from '../schema/order.schema';

@Resolver(() => Order)
export class OrderResolver {
    constructor(
        private orderService: OrderService
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

    @ResolveField()
    async lines(@Parent() order: Order) {
        return await this.orderService.orderLinesByOrderId(order._id)
    }
}