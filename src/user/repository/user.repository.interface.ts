import { User } from '../entity/user.entity';

export interface UserRepository {
  findAll(): User[];
  findById(id: string): User | undefined;
  create(newUser: User): User;
  update(id: string, user: Partial<User>): User | undefined;
  delete(id: string): boolean;
}
