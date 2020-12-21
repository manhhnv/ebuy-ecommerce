import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
