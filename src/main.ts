import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      secret: process.env.SESSION_PRIVATE_KEY,
      resave: true,
      saveUninitialized: true,

    })
  )
  await app.listen(process.env.PORT);
  console.log(`Success: Graphql running at http://0.0.0.0:${process.env.PORT}/graphql`)
}
bootstrap();
