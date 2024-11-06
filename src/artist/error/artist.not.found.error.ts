import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class ArtistNotFoundException extends ServiceHttpException {
  constructor() {
    super('Artist not found', HttpStatus.NOT_FOUND);
  }
}
