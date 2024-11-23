import { validate as isUuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { UserNotFoundException } from '../error/user.not.found.error';
import { IncorrectOldPasswordException } from '../error/incorrect.old.password.error';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { PasswordManager } from './password.managet';
import { UserLoginAlreadyExistException } from '../error/user.login.already.exist.error';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordManager: PasswordManager,
  ) {}

  async findAll(): Promise<UserModel[]> {
    const foundUsers = await this.userRepository.findAll();
    return foundUsers.map(convert);
  }

  async findById(id: string): Promise<UserModel> {
    this.validateId(id);
    const user = await this.findUser(id);
    return convert(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const login: string = createUserDto.login;

    const foundUser = await this.userRepository.findByLogin(login);

    if (foundUser) {
      throw new UserLoginAlreadyExistException();
    }

    const hashPassword = await this.passwordManager.hashPassword(
      createUserDto.password,
    );

    const newUser: Partial<User> = {
      login: createUserDto.login,
      password: hashPassword,
    };
    const createdUser = await this.userRepository.create(newUser);
    return convert(createdUser);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserModel> {
    this.validateId(id);
    const user = await this.findUser(id);
    const isValidOldPassword: boolean =
      await this.passwordManager.comparePassword(
        updatePasswordDto.oldPassword,
        user.password,
      );
    if (!isValidOldPassword) {
      throw new IncorrectOldPasswordException();
    }

    const newHashedPassword: string = await this.passwordManager.hashPassword(
      updatePasswordDto.newPassword,
    );
    const updatedUser = await this.userRepository.update(id, {
      password: newHashedPassword,
    });
    if (!updatedUser) {
      throw new UserNotFoundException();
    }
    return convert(updatedUser);
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const success = await this.userRepository.delete(id);
    if (!success) {
      throw new UserNotFoundException();
    }
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private async findUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}

const convert = (user: User): UserModel => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt.getTime(),
    updatedAt: user.updatedAt.getTime(),
  };
};
