import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class FavoriteItemNotFoundException extends ServiceHttpException {
  constructor(
    msg: string,
    httpStatus: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(msg, httpStatus);
  }
}
