import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIDException extends HttpException {
  constructor() {
    super('Invalid ID', HttpStatus.BAD_REQUEST);
  }
}
