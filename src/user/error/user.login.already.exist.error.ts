import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class UserLoginAlreadyExistException extends ServiceHttpException {
  constructor() {
    super('User with login already exists', HttpStatus.BAD_REQUEST);
  }
}
