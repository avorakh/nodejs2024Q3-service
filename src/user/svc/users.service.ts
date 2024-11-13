import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.interface';
import { UserRepository } from '../repository/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { UserNotFoundException } from '../error/user.not.found.error';
import { IncorrectOldPasswordException } from '../error/incorrect.old.password.error';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  findAll(): UserModel[] {
    return this.userRepository.findAll().map(convert);
  }

  findById(id: string): UserModel {
    this.validateId(id);
    const user = this.findUser(id);
    return convert(user);
  }

  create(createUserDto: CreateUserDto): UserModel {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdUser = this.userRepository.create(newUser);
    return convert(createdUser);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): UserModel {
    this.validateId(id);
    const user = this.findUser(id);
    if (user.password !== updatePasswordDto.oldPassword)
      throw new IncorrectOldPasswordException();

    const updatedUser = this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
    });
    if (!updatedUser) {
      throw new UserNotFoundException();
    }
    return convert(updatedUser);
  }

  delete(id: string): void {
    this.validateId(id);
    const success = this.userRepository.delete(id);
    if (!success) {
      throw new UserNotFoundException();
    }
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findUser(id: string) {
    const user = this.userRepository.findById(id);
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
