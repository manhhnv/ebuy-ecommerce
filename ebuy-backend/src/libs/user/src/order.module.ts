import { Module } from '@nestjs/common';
import { OrderResolver } from './resolver/order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderLine, OrderLineSchema } from './schema/orderLine.schema';
import { OrderService } from './service/order.service';
import { User, UserSchema } from './schema/user.schema';
import { ShippingAddress, ShippingAddressSchema } from 'src/libs/shipping-address/src/schema/shipping-address.schema';
import { ShippingAddressModule } from 'src/libs/shipping-address';
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Order.name, schema: OrderSchema},
            {name: OrderLine.name, schema: OrderLineSchema},
            {name: User.name, schema: UserSchema},
            {name: ShippingAddress.name, schema: ShippingAddressSchema}
        ]),
        ShippingAddressModule
    ],
    providers: [OrderResolver, OrderService],
    exports: [OrderResolver]
})
export class OrderModule {}