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
import { Collection, CollectionSchema } from './schema/collection.schema';
import { SubCollection, SubCollectionSchema } from './schema/sub-collection.schema';
import { CollectionService } from './service/collection.service';
import { CollectionResolver } from './resolver/collection.resolver';
import { ProductController } from './controller/product.controller';
import { MulterModule } from '@nestjs/platform-express';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
        {name: Product.name, schema: ProductSchema},
        {name: ProductVariant.name, schema: ProductVariantSchema},
        {name: Asset.name, schema: AssetSchema},
        {name: ProductPromotion.name, schema: ProductPromotionSchema},
        {name: Collection.name, schema: CollectionSchema},
        {name: SubCollection.name, schema: SubCollectionSchema}
    ]),
    MulterModule.register({
      dest: './uploads/image/variant',
    })
  ],
  providers: [
      ProductResolver, ProductService,
      ProductVariantResolver, ProductVariantService,
      ProductPromotionService, CollectionService,
      CollectionResolver,
    ],
  controllers: [ProductController],
  exports: [
    ProductService, ProductVariantService,
    ProductPromotionService, CollectionService
  ]
})
export class ProductModule {}
