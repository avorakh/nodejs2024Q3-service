import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './svc/users.service';
import { InMemoryUserRepository } from './repository/inmemory.user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class UserRepositoryModule {}

@Module({
  imports: [UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
