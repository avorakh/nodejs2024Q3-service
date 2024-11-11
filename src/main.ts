import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { ServiceHttpExceptionFilter } from './error/service.exception.filter';

const logger = new Logger('main/bootstrap');
config();

const WEB_SERVER_PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ServiceHttpExceptionFilter());

  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: false,
  });

  await app.listen(WEB_SERVER_PORT);
  logger.log(`Server is running on port: ${WEB_SERVER_PORT}`);
}
bootstrap();
