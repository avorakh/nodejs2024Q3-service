import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { UserNotFoundException } from '../error/user.not.found.error';
import { IncorrectOldPasswordException } from '../error/incorrect.old.password.error';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
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
    if (user.password !== updatePasswordDto.oldPassword)
      throw new IncorrectOldPasswordException();

    const updatedUser = await this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
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
