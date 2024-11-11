import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class FavoriteItemNotFoundException extends ServiceHttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
