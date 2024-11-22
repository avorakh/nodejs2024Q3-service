import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: any = {
      statusCode: status,
    };

    if (exception instanceof BadRequestException) {
      errorResponse.message = 'Bad Request';
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const { message } = exceptionResponse as any;
        if (Array.isArray(message)) {
          errorResponse.errors = message;
        } else {
          errorResponse.errors = [message];
        }
      }
    } else if (exception instanceof HttpException) {
      errorResponse.message = exception.getResponse();
    } else {
      errorResponse.message = 'Internal server error';
    }

    this.logger.error(
      `Exception thrown: ${JSON.stringify({
        method: request.method,
        url: request.url,
        status,
        exception: JSON.stringify(exception),
      })}`,
      exception.stack,
      GlobalExceptionFilter.name,
    );

    response.status(status).json(errorResponse);
  }
}
