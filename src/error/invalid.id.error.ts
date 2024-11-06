import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from './service.http.exception';

export class InvalidIDException extends ServiceHttpException {
  constructor() {
    super('Invalid ID', HttpStatus.BAD_REQUEST);
  }
}
