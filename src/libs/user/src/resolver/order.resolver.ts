import {
    Resolver, ResolveField, Query, Mutation,
    Args, Parent, Context
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { TokenAuthGuard } from 'src/libs/auth/src/guard/token-auth.guard';
import { User } from 'src/generate-types';

@Resolver()
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
}