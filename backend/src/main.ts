import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
  if (process.env.APP_MODE === 'debug') {
    mongoose.set('debug', true);
  }
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
