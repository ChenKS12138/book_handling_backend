import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './loadEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.LISTEN_PORT || 3000);
}
bootstrap();
