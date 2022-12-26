import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'log'],
  });
  app.enableCors({
    origin: process.env.CORS_ALLOWED_ORIGIN,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'OPTIONS', 'POST', 'DELETE'],
    allowedHeaders: '*',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
