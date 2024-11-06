import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ServiceHttpException } from './service.http.exception';

@Catch(ServiceHttpException)
export class ServiceHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ServiceHttpExceptionFilter.name);

  catch(exception: ServiceHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.message || 'Internal server error';

    this.logger.error(
      `HTTP ${status} Error: ${message} - ${request.method} ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
