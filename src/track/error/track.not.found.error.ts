import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class TrackNotFoundException extends ServiceHttpException {
  constructor() {
    super('Track not found', HttpStatus.NOT_FOUND);
  }
}
