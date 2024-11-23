import { UsersServiceModule } from 'src/user/users.module';
import { AuthController } from './controller/auth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersServiceModule],
  controllers: [AuthController],
})
export class AuthModule {}
