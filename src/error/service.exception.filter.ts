import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ServiceHttpException } from './service.http.exception';

const logger = new Logger();

@Catch(ServiceHttpException)
export class ServiceHttpExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.message || 'Internal server error';

    logger.error(
      `HTTP ${status} Error: ${message} - ${request.method} ${request.url}`,
      exception.stack,
      ServiceHttpExceptionFilter.name,
    );

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
