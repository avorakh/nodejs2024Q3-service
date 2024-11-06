import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.interface';
import { UserRepository } from '../repository/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  findAll(): Omit<User, 'password'>[] {
    return this.userRepository.findAll().map(this.hidePassword);
  }

  findById(id: string): Omit<User, 'password'> {
    this.validateId(id);
    const user = this.findUser(id);
    return this.hidePassword(user);
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = this.userRepository.create(newUser);
    return this.hidePassword(createdUser);
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    this.validateId(id);
    const user = this.findUser(id);
    if (user.password !== updatePasswordDto.oldPassword)
      throw new Error('Incorrect old password');

    const updatedUser = this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
    });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return this.hidePassword(updatedUser);
  }

  delete(id: string): void {
    this.validateId(id);
    const success = this.userRepository.delete(id);
    if (!success) {
      throw new Error('User not found');
    }
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new Error('Invalid UUID');
    }
  }

  private findUser(id: string) {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  private hidePassword(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as Omit<User, 'password'>;
  }
}
