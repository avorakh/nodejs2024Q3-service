import { Album } from '../entity/album.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private readonly artistTypeormRepository: Repository<Album>,
  ) {}

  async findAll(): Promise<Album[]> {
    return this.artistTypeormRepository.find();
  }

  async findById(id: string): Promise<Album | undefined> {
    return this.artistTypeormRepository.findOne({ where: { id } });
  }

  async create(newUser: Album): Promise<Album> {
    const user = this.artistTypeormRepository.create(newUser);
    return this.artistTypeormRepository.save(user);
  }

  async update(id: string, user: Partial<Album>): Promise<Album | undefined> {
    await this.artistTypeormRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.artistTypeormRepository.delete(id);
    return result.affected !== 0;
  }
}
