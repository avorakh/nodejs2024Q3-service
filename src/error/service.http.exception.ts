import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceHttpException extends HttpException {
  constructor(message: string, errorStatus: HttpStatus) {
    super(message, errorStatus);
  }
}
