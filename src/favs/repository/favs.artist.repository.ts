import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteArtist } from '../entity/favorite.artist.entity';

@Injectable()
export class FavoriteArtistRepository {
  constructor(
    @InjectRepository(FavoriteArtist)
    private readonly favsArtistTypeormRepository: Repository<FavoriteArtist>,
  ) {}

  async findAll(): Promise<FavoriteArtist[]> {
    return this.favsArtistTypeormRepository.find({ relations: ['artist'] });
  }

  async create(artistId: string): Promise<FavoriteArtist> {
    const user = this.favsArtistTypeormRepository.create({ artistId });
    return this.favsArtistTypeormRepository.save(user);
  }

  async delete(artistId: string): Promise<boolean> {
    const result = await this.favsArtistTypeormRepository.delete({ artistId });
    return result.affected !== 0;
  }
}
