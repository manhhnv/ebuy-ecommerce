import {
    Resolver, ResolveField, Query, Mutation,
    Args, Parent, Context
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { TokenAuthGuard } from '../../../../shared/auth/src/guard/token-auth.guard';
import { User } from '../../../../generate-types';
import { Order } from '../schema/order.schema';
import { OrderLine } from '../schema/orderLine.schema';
import { ShippingAddress } from '../../../shipping-address/src/schema/shipping-address.schema';
import { ShippingAddressService } from '../../../shipping-address/src/service/shipping-address.service';
import { PoliciesGuard } from '../../../../shared/policy/policies.guard';
import { CheckPolicies } from '../../../../shared/policy/policy.decorator';
import { OrderPolicy } from '../../../../shared/policy/permission/order.policy';
import { Action } from '../../../../shared/casl/action.enum';

@Resolver(() => Order)
export class OrderResolver {
    constructor(
        private orderService: OrderService,
        private shippingAddressService: ShippingAddressService
    ) {}

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Create))
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
    
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Read))
    @Query()
    activeOrder(@Context('user') user: User) {
        const {_id} = user
        return this.orderService.getActiveOrder(_id);
    }
    
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Update))
    @Mutation()
    async removeItemFromOrder(@Context('user') user: User, @Args('orderLineId') orderLineId: string) {
        const {_id} = user;
        return this.orderService.removeOrderLine(_id, orderLineId);
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Update))
    @Mutation()
    incrementOrderItem(@Context('user')user: User ,@Args('orderLineId')orderLineId: string) {
        const {_id} = user;
        return this.orderService.incrementOrderItem(_id, orderLineId)
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Update))
    @Mutation()
    decreaseOrderItem(@Context('user') user: User, @Args('orderLineId')orderLineId: string) {
        const {_id} = user;
        return this.orderService.decreaseOrderItem(_id, orderLineId)
    }
    
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Update))
    @Mutation()
    setShippingAddressForOrder(@Context('user') user: User, @Args('addressId') addressId: string) {
        const {_id} = user;
        return this.orderService.setShippingAddressForOrder(_id, addressId)
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new OrderPolicy(Action.Update))
    @Mutation()
    applyCouponToOrder(@Context('user') user: User, @Args('couponId') couponId: string) {
        const {_id} = user;
        return this.orderService.applyCouponToOrder(_id, couponId)
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