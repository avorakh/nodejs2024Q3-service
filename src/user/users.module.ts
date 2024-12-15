import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './svc/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSourceModule } from '../orm/orm.datasource';
import { UserRepository } from './repository/user.repository';
import { PasswordManager } from './svc/password.managet';

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}

@Module({
  providers: [PasswordManager],
  exports: [PasswordManager],
})
export class PasswordManagerModule {}

@Module({
  imports: [UserRepositoryModule, PasswordManagerModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersServiceModule {}

@Module({
  imports: [UsersServiceModule],
  controllers: [UsersController],
})
export class UsersModule {}
