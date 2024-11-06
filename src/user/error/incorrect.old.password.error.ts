import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectOldPasswordException extends HttpException {
  constructor() {
    super('Incorrect old password', HttpStatus.FORBIDDEN);
  }
}
