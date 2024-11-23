import {
  PasswordManagerModule,
  UserRepositoryModule,
  UsersServiceModule,
} from 'src/user/users.module';
import { AuthController } from './controller/auth.controller';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './svc/auth.svc';
import {
  AccessJwtTokenGenerator,
  RefreshJwtTokenGenerator,
} from './svc/jwt.token.generator';

@Module({
  providers: [AccessJwtTokenGenerator, RefreshJwtTokenGenerator],
  exports: [AccessJwtTokenGenerator, RefreshJwtTokenGenerator],
})
export class JwtTokenGeneratorModule {}

@Module({
  imports: [
    UserRepositoryModule,
    PasswordManagerModule,
    JwtTokenGeneratorModule,
  ],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationServiceModule {}

@Module({
  imports: [UsersServiceModule, AuthenticationServiceModule],
  controllers: [AuthController],
})
export class AuthModule {}
