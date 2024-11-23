import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { PasswordManager } from 'src/user/svc/password.managet';
import { TokenResponseModel } from '../model/token.response.model';
import {
  AuthenticationFailedException,
  InvalidOrExpiredTokenException,
} from '../error/auth.exception';
import { User } from 'src/user/entity/user.entity';
import {
  AccessJwtTokenGenerator,
  RefreshJwtTokenGenerator,
} from './jwt.token.generator';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordManager: PasswordManager,
    private readonly accessJwtTokenGenerator: AccessJwtTokenGenerator,
    private readonly refreshJwtTokenGenerator: RefreshJwtTokenGenerator,
  ) {}

  async login(loginDto: UserDto): Promise<TokenResponseModel> {
    const { login, password } = loginDto;

    return this.findUser(login)
      .then((foundUser) => this.verifyPassword(foundUser, password))
      .then((foundUser) => this.generateTokenPair(foundUser));
  }

  async refreshToken(refreshToken: string): Promise<TokenResponseModel> {
    const { userId, login } =
      this.refreshJwtTokenGenerator.verifyJwtToken(refreshToken);

    return this.userRepository
      .findByIdAndLogin(userId, login)
      .then((foundUser): User => {
        if (!foundUser) {
          throw new InvalidOrExpiredTokenException();
        }
        return foundUser;
      })
      .then((foundUser) => this.generateTokenPair(foundUser));
  }

  async verify(accessToken: string): Promise<void> {
    const { userId, login } =
      this.accessJwtTokenGenerator.verifyJwtToken(accessToken);

    return this.userRepository
      .findByIdAndLogin(userId, login)
      .then((foundUser): void => {
        if (!foundUser) {
          throw new InvalidOrExpiredTokenException();
        }
      });
  }

  private findUser(login: string): Promise<User> {
    return this.userRepository.findByLogin(login).then((foundUser): User => {
      if (!foundUser) {
        throw new AuthenticationFailedException();
      }
      return foundUser;
    });
  }

  private verifyPassword(user: User, password: string): Promise<User> {
    return this.passwordManager
      .comparePassword(password, user.password)
      .then((isValidPassword): User => {
        if (!isValidPassword) {
          throw new AuthenticationFailedException();
        }
        return user;
      });
  }

  private generateTokenPair(user: User): TokenResponseModel {
    return {
      accessToken: this.accessJwtTokenGenerator.generateJwtToken(
        user.id,
        user.login,
      ),
      refreshToken: this.refreshJwtTokenGenerator.generateJwtToken(
        user.id,
        user.login,
      ),
    };
  }
}
