import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
//import { logger } from './utils/logger/index';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //await app.listen(3000);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    allowedHeaders: [
      '*',
      /* 'Content-Type, Access-Control-Allow-Origin, x-access-token, Accept', */
    ],
    methods: 'POST,GET,PUT,PATCH,DELETE',
  });
  app.use(compression());
  //app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      //stopAtFirstError: true,
    }),
  );

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
  app.setGlobalPrefix('api');
  const port = '3000';
  await app.listen(port);
  console.log(
    `CHAT IS RUNNING ON PORT ${port}: ${await app.getUrl()}`,
  );
}
bootstrap();
