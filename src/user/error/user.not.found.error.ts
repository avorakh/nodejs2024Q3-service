import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class UserNotFoundException extends ServiceHttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
