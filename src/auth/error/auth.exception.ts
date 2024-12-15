import { HttpStatus } from '@nestjs/common';
import { ServiceHttpException } from '../../error/service.http.exception';

export class AuthenticationFailedException extends ServiceHttpException {
  constructor(message = 'Authentication failed') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class InvalidOrExpiredTokenException extends ServiceHttpException {
  constructor(
    message = 'Token is invalid or expired.',
    status = HttpStatus.FORBIDDEN,
  ) {
    super(message, status);
  }
}

export class BadRefreshTokenException extends ServiceHttpException {
  constructor(message = 'Refresh token must be provided.') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class RequestAuthorizationException extends ServiceHttpException {
  constructor(message = 'Invalid or expired access token.') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
