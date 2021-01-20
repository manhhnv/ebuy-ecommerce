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
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import path from 'path';
import { ShippingMethodModule } from 'src/libs/shipping-method';

const { GraphQLUpload } = require('graphql-upload');
@Module({
  imports: [
    Upload,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    // MailerModule.forRoot({
    //   transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //   defaults: {
    //     from:'"nest-modules" <modules@nestjs.com>',
    //   },
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new PugAdapter(),
    //     options: {
    //       strict: true
    //     }
    //   },
    //   options: {
    //     partials: {
    //       dir: path.join(process.env.PWD, 'templates/partials'),
    //       options: {
    //         strict: true,
    //       },
    //     }
    //   }
    // }),
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
    ShippingMethodModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
