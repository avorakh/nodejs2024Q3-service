import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class AlbumNotFoundException extends ServiceHttpException {
  constructor() {
    super('Album not found', HttpStatus.NOT_FOUND);
  }
}
