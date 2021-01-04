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
const { GraphQLUpload } = require('graphql-upload');

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ebuy'),
    GraphQLModule.forRoot({
      typePaths: ['src/libs/**/src/graphql/*.graphql'],
      resolvers: [{ JSON: GraphQLJSON }, {Upload: GraphQLUpload}],
      context: ({ req, res }) => {
        const test = {
          path: '/',
          originalMaxAge: 60000,
          httpOnly: true,
          secure: true
        }
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
    ShippingAddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
