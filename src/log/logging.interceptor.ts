import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = uuidv4();

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, url, headers, query, body } = req;

    this.logger.log(`[${requestId}] - Request: ${method} ${url}`);
    this.logger.log(`[${requestId}] - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(
      `[${requestId}] - Query parameters: ${JSON.stringify(query)}`,
    );
    this.logger.log(`[${requestId}] - Body: ${JSON.stringify(body)}`);

    return next.handle().pipe(
      tap(() => {
        const statusCode = res.statusCode;
        this.logger.log(`[${requestId}] - Response Status: ${statusCode}`);
      }),
    );
  }
}
