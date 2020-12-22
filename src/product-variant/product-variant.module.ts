import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVariant, ProductVariantSchema } from './product-variant.schema';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductVariantService } from './product-variant.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: ProductVariant.name, schema: ProductVariantSchema}]),
    ],
    providers: [ProductVariantResolver, ProductVariantService],
    exports: [ProductVariantService]
})
export class ProductVariantModule {}
