import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class IncorrectOldPasswordException extends ServiceHttpException {
  constructor() {
    super('Incorrect old password', HttpStatus.FORBIDDEN);
  }
}
