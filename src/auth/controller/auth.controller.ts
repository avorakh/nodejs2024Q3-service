import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/svc/users.service';
import { AuthenticationService } from '../svc/auth.svc';
import { BadRefreshTokenException } from '../error/auth.exception';

interface RefreshTokenDto {
  refreshToken: string | null;
}

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

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto?: RefreshTokenDto | undefined) {
    if (!refreshTokenDto || !refreshTokenDto.refreshToken) {
      throw new BadRefreshTokenException();
    }

    const { refreshToken } = refreshTokenDto;
    return await this.authenticationService.refreshToken(refreshToken);
  }
}
