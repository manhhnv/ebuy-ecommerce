import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './resolver/product.resolver';
import { ProductService } from './service/product.service';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductVariant, ProductVariantSchema } from './schema/product-variant.schema';
import { ProductVariantService } from './service/product-variant.service';
import { ProductVariantResolver } from './resolver/product-variant.resolver';
import { Asset, AssetSchema } from './schema/asset.schema';
import { ProductPromotion, ProductPromotionSchema } from './schema/product-promotion.schema';
import { ProductPromotionService } from './service/product-promotion.service';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
        {name: Product.name, schema: ProductSchema},
        {name: ProductVariant.name, schema: ProductVariantSchema},
        {name: Asset.name, schema: AssetSchema},
        {name: ProductPromotion.name, schema: ProductPromotionSchema}
    ]),
  ],
  providers: [
      ProductResolver, ProductService,
      ProductVariantResolver, ProductVariantService,
      ProductPromotionService,
    ],
  exports: [ProductService, ProductVariantService, ProductPromotionService]
})
export class ProductModule {}
