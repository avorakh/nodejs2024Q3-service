import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteTrack } from '../entity/favorite.track.entity';

@Injectable()
export class FavoriteTrackRepository {
  constructor(
    @InjectRepository(FavoriteTrack)
    private readonly favsTrackTypeormRepository: Repository<FavoriteTrack>,
  ) {}

  async findAll(): Promise<FavoriteTrack[]> {
    return this.favsTrackTypeormRepository.find({ relations: ['track'] });
  }

  async create(trackId: string): Promise<FavoriteTrack> {
    const user = this.favsTrackTypeormRepository.create({ trackId });
    return this.favsTrackTypeormRepository.save(user);
  }

  async delete(trackId: string): Promise<boolean> {
    const result = await this.favsTrackTypeormRepository.delete({ trackId });
    return result.affected !== 0;
  }
}
