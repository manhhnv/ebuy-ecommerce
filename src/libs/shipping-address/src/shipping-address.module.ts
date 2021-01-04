import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingAddress, ShippingAddressSchema } from './schema/shipping-address.schema';
import { ShippingAddressResolver } from './resolver/shipping-address.resolver';
import { ShippingAddressService } from './service/shipping-address.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ShippingAddress.name, schema: ShippingAddressSchema}
        ])
    ],
    providers: [ShippingAddressResolver, ShippingAddressService],
    exports: [ShippingAddressService]
})
export class ShippingAddressModule {

}