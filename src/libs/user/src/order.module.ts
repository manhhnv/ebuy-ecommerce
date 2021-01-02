import { Module } from '@nestjs/common';
import { OrderResolver } from './resolver/order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderLine, OrderLineSchema } from './schema/orderLine.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Order.name, schema: OrderSchema},
            {name: OrderLine.name, schema: OrderLineSchema}
        ])
    ],
    providers: [OrderResolver],
    exports: [OrderResolver]
})
export class OrderModule {}