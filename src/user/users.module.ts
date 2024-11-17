import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './svc/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSourceModule } from '../orm/orm.datasource';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}

@Module({
  imports: [UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
