import { Artist } from '../entity/artist.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistTypeormRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistTypeormRepository.find();
  }

  async findById(id: string): Promise<Artist | undefined> {
    return this.artistTypeormRepository.findOne({ where: { id } });
  }

  async create(newUser: Partial<Artist>): Promise<Artist> {
    const user = this.artistTypeormRepository.create(newUser);
    return this.artistTypeormRepository.save(user);
  }

  async update(id: string, user: Partial<Artist>): Promise<Artist | undefined> {
    await this.artistTypeormRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.artistTypeormRepository.delete(id);
    return result.affected !== 0;
  }
}
