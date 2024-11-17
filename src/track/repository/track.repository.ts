import { Track } from '../entity/track.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackRepository {
  constructor(
    @InjectRepository(Track)
    private readonly trackTypeormRepository: Repository<Track>,
  ) {}
  async findAll(): Promise<Track[]> {
    return this.trackTypeormRepository.find();
  }

  async findById(id: string): Promise<Track | undefined> {
    return this.trackTypeormRepository.findOne({ where: { id } });
  }

  async create(newUser: Track): Promise<Track> {
    const user = this.trackTypeormRepository.create(newUser);
    return this.trackTypeormRepository.save(user);
  }

  async update(id: string, user: Partial<Track>): Promise<Track | undefined> {
    await this.trackTypeormRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.trackTypeormRepository.delete(id);
    return result.affected !== 0;
  }
}
