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
const { GraphQLUpload } = require('graphql-upload');
@Module({
  imports: [
    Upload,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ebuy'),
    GraphQLModule.forRoot({
      debug: true,
      typePaths: ['src/libs/**/src/graphql/*.graphql'],
      uploads: {
        maxFieldSize: 10000000,
        maxFiles: 5
      },
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
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    ProductModule,
    UserModule,
    UploadModule,
    OrderModule,
    ShippingAddressModule,
    SlideModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
