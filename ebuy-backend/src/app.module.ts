import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
// import { UserModule } from 'src/libs/user';
import { UserModule } from './libs/user/index'
import GraphQLJSON from 'graphql-type-json';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './libs/upload';
import { OrderModule } from './libs/user';
import { ShippingAddressModule } from './libs/shipping-address';
import { Upload } from './utils/scalar/upload.scalar';
import { SlideModule } from './libs/slider';
import { CouponModule } from './libs/coupon';
import { CaslModule } from './shared/casl';
import { ShopModule } from './libs/shop';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import path from 'path';
import { ShippingMethodModule } from './libs/shipping-method';

const { GraphQLUpload } = require('graphql-upload');
const uri = process.env.DB_URL
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
    MongooseModule.forRoot(uri || "mongodb://127.0.0.1:27017/ebuy"),
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
      debug: true,
      typePaths: ['src/libs/**/src/graphql/*.graphql', 'src/shared/**/src/graphql/*.graphql'],
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
