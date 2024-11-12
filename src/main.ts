import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { ServiceHttpExceptionFilter } from './error/service.exception.filter';
import { serve, setup } from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { load } from 'js-yaml';

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

  try {
    const openApiPath = resolve(__dirname, './../../doc/api.yaml');
    const fileContent = await readFile(openApiPath, 'utf8');
    const openApiDocument = load(fileContent);
    app.use('/doc', serve, setup(openApiDocument));
  } catch (error) {
    console.error('Error loading OpenAPI file:', error);
  }
  await app.listen(WEB_SERVER_PORT);
  logger.log(`Server is running on port: ${WEB_SERVER_PORT}`);
}
bootstrap();
