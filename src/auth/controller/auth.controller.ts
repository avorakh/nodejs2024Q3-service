import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/user/dto/create-user.dto';

import { UsersService } from 'src/user/svc/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    return await this.usersService.create(userDto).then(async (user) => {
      return { id: user.id };
    });
  }
}
