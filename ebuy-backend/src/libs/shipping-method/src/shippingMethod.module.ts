import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ShippingMethod, ShippingMethodSchema } from './schema/shipping-method.schema';
import { ShippingMethodService } from './service/shipping-method.service';
import { ShippingMethodResolver } from './resolver/shipping-method.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ShippingMethod.name, schema: ShippingMethodSchema}
        ]),

    ],
    providers: [
        ShippingMethodService,
        ShippingMethodResolver,
    ],
    exports: [ShippingMethodService]
})
export class ShippingMethodModule {}