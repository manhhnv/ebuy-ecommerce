import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from 'src/libs/product';
import { UserModule } from 'src/libs/user';
import GraphQLJSON from 'graphql-type-json';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from 'src/libs/upload';
import { OrderModule } from 'src/libs/user';
import { ShippingAddressModule } from 'src/libs/shipping-address';
import { Upload } from 'src/utils/scalar/upload.scalar';
import { SlideModule } from 'src/libs/slider';
import { CouponModule } from 'src/libs/coupon';
import { CaslModule } from 'src/shared/casl';
import { ShopModule } from './libs/shop';
const { GraphQLUpload } = require('graphql-upload');
@Module({
  imports: [
    Upload,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ebuy'),
    GraphQLModule.forRoot({
      debug: true,
      typePaths: ['src/libs/**/src/graphql/*.graphql', 'src/shared/**/src/graphql/*.graphql'],
      uploads: {
        maxFieldSize: 10000000,
        maxFiles: 5
      },
      path: process.env.GRAPHQL_PATH,
      resolvers: [{ JSON: GraphQLJSON }, {Upload: GraphQLUpload}],
      context: ({ req, res }) => {
        return {
          headers: req.headers,
          session: req.session,
          req: req,
          res: res
        }
      }
    }),
    ProductModule,
    UserModule,
    UploadModule,
    OrderModule,
    ShippingAddressModule,
    SlideModule,
    CouponModule,
    CaslModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
