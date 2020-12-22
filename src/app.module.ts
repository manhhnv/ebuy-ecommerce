import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from 'src/libs/product';
import { UserModule } from 'src/libs/user/index'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ebuy'),
    GraphQLModule.forRoot({
      typePaths: ['src/libs/**/src/graphql/*.graphql'],
    }),
    ProductModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
