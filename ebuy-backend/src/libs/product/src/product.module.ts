import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './resolver/product.resolver';
import { ProductService } from './service/product.service';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductVariant, ProductVariantSchema } from './schema/product-variant.schema';
import { ProductVariantService } from './service/product-variant.service';
import { ProductVariantResolver } from './resolver/product-variant.resolver';
import { Asset, AssetSchema } from './schema/asset.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
        {name: Product.name, schema: ProductSchema},
        {name: ProductVariant.name, schema: ProductVariantSchema},
        {name: Asset.name, schema: AssetSchema}
    ]),
  ],
  providers: [
      ProductResolver, ProductService,
      ProductVariantResolver, ProductVariantService
    ],
  exports: [ProductService, ProductVariantService]
})
export class ProductModule {}
