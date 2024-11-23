import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/svc/users.service';
import { AuthenticationService } from '../svc/auth.svc';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    return await this.usersService.create(userDto).then(async (user) => {
      return { id: user.id };
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDto: UserDto) {
    return await this.authenticationService.login(userDto);
  }
}
