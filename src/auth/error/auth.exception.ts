import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class AuthenticationFailedException extends ServiceHttpException {
  constructor() {
    super('Authentication failed', HttpStatus.FORBIDDEN);
  }
}
