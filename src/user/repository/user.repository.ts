import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userTypeormRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userTypeormRepository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userTypeormRepository.findOne({ where: { id } });
  }

  async create(newUser: User): Promise<User> {
    const user = this.userTypeormRepository.create(newUser);
    return this.userTypeormRepository.save(user);
  }

  async update(id: string, user: Partial<User>): Promise<User | undefined> {
    await this.userTypeormRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userTypeormRepository.delete(id);
    return result.affected !== 0;
  }
}
