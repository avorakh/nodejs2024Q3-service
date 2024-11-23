import { sign, SignOptions, verify } from 'jsonwebtoken';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InvalidOrExpiredTokenException } from '../error/auth.exception';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface TokenPayload {
  type: TokenType;
  userId: string;
  login: string;
}

class JwtTokenGenerator {
  private readonly tokenType: TokenType;
  private readonly secretKey: string;
  private readonly defaultSignOptions: SignOptions;

  constructor(
    tokenType: TokenType,
    secretKeyEnvVar: string,
    ttlEnvVar: string,
    defaultTtl: string,
  ) {
    this.tokenType = tokenType;
    const refreshSecretKey = process.env[secretKeyEnvVar];
    if (!refreshSecretKey) {
      throw new Error(`${tokenType} JWT secret key is not defined.`);
    }
    this.secretKey = refreshSecretKey;

    const tokenExpireTime = process.env[ttlEnvVar] || defaultTtl;

    this.defaultSignOptions = {
      expiresIn: tokenExpireTime,
    };
  }

  generateJwtToken(userId: string, login: string): string {
    const payload: TokenPayload = {
      type: this.getTokenType(),
      userId,
      login,
    };
    return sign(payload, this.getSecretKey(), this.getDefaultSignOptions());
  }

  verifyJwtToken(encodedToken: string): TokenPayload {
    let decodedToken: TokenPayload;

    try {
      decodedToken = verify(encodedToken, this.getSecretKey()) as TokenPayload;
    } catch (err) {
      throw new InvalidOrExpiredTokenException();
    }

    if (!decodedToken || decodedToken.type !== this.getTokenType()) {
      const httpStatus =
        this.getTokenType() === TokenType.REFRESH
          ? HttpStatus.FORBIDDEN
          : HttpStatus.UNAUTHORIZED;
      throw new InvalidOrExpiredTokenException(
        'Token is invalid or expired.',
        httpStatus,
      );
    }

    return decodedToken;
  }

  private getTokenType(): TokenType {
    return this.tokenType;
  }
  private getSecretKey(): string {
    return this.secretKey;
  }
  private getDefaultSignOptions(): SignOptions {
    return this.defaultSignOptions;
  }
}

@Injectable()
export class AccessJwtTokenGenerator extends JwtTokenGenerator {
  constructor() {
    super(TokenType.ACCESS, 'JWT_SECRET_KEY', 'TOKEN_EXPIRE_TIME', `15m`);
  }
}

@Injectable()
export class RefreshJwtTokenGenerator extends JwtTokenGenerator {
  constructor() {
    super(
      TokenType.REFRESH,
      'JWT_SECRET_REFRESH_KEY',
      'TOKEN_REFRESH_EXPIRE_TIME',
      `8h`,
    );
  }
}
