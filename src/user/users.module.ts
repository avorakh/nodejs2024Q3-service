import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './svc/users.service';
import { InMemoryUserRepository } from './repository/inmemory.user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class UsersModule {}
