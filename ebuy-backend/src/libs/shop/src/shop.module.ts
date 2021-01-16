import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Shop, ShopSchema } from './schema/shop.schema';
import { ShopController } from './controller/shop.controller';
import { ShopService } from './service/shop.service';
import { ShopResolver } from './resolver/shop.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Shop.name, schema: ShopSchema},
        ])
    ],
    providers: [ShopService, ShopResolver],
    controllers: [ShopController],
    exports: []
})

export class ShopModule {}