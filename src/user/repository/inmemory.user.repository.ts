import { User } from '../entity/user.entity';
import { UserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  create(newUser: User): User {
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  update(id: string, user: Partial<User>): User | undefined {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return undefined;
    }

    const updatedUser = {
      ...existingUser,
      ...user,
      version: existingUser.version + 1,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }
}
