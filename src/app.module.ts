import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';
import { ProductVariantModule } from './product-variant/product-variant.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ebuy'),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql']
    }),
    ProductModule,
    ProductVariantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
