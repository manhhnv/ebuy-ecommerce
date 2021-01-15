import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingAddress, ShippingAddressSchema } from './schema/shipping-address.schema';
import { ShippingAddressResolver } from './resolver/shipping-address.resolver';
import { ShippingAddressService } from './service/shipping-address.service';
import { Province, ProvinceSchema } from './schema/province.schema';
import { State, StateSchema } from './schema/state.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ShippingAddress.name, schema: ShippingAddressSchema},
            {name: Province.name, schema: ProvinceSchema},
            {name: State.name, schema: StateSchema},
        ])
    ],
    providers: [ShippingAddressResolver, ShippingAddressService],
    exports: [ShippingAddressService]
})
export class ShippingAddressModule {

}