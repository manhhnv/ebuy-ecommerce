import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';
import { ProductVariantModule } from '../product-variant/product-variant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    ProductVariantModule
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService]
})
export class ProductModule {}
