import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestAuthorizationException } from './auth/error/auth.exception';
import { AuthenticationService } from './auth/svc/auth.svc';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new RequestAuthorizationException(
        'Authorization header is missing.',
      );
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new RequestAuthorizationException(
        'Authorization header must follow Bearer scheme.',
      );
    }

    const token = parts[1];
    await this.authenticationService.verify(token);

    next();
  }
}
