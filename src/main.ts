import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      secret: process.env.SESSION_PRIVATE_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000,
      },
      name: "Session-ID",
      genid: function(resq) {
        return JSON.stringify(Math.random())
      }
    })
  )
  app.use(cookieParser())
  // app.use(cookieSession({
  //   name: 'session',
  // }))
  await app.listen(process.env.PORT);
  console.log(`Success: Graphql running at http://0.0.0.0:${process.env.PORT}/graphql`)
}
bootstrap();
