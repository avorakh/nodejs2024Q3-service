import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

const logger = new Logger('main/bootstrap');
config();

const WEB_SERVER_PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(WEB_SERVER_PORT);
  logger.log(`Server is running on port: ${WEB_SERVER_PORT}`);
}
bootstrap();
