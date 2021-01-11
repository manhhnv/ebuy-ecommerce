import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import cookieSession = require('cookie-session');
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { graphqlUploadExpress } from 'graphql-upload';

const MongoStore = require('connect-mongo')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(
    session({
      secret: "secretKeySession",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/ebuy'
      }),
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  // app.use(graphqlUploadExpress({
  //   maxFieldSize: 100000,
  //   maxFiles: 5
  // }))
  await app.listen(process.env.PORT);
  console.log( '\n' + 'Success: 🚀 GraphQL running at ' + '\u001b[' + 32 + 'm' + `http://0.0.0.0:${process.env.PORT}/graphql` + '\u001b[0m')
}
bootstrap();
