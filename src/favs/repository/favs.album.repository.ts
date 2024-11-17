import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbum } from '../entity/favorite.album.entity';

@Injectable()
export class FavoriteAlbumRepository {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private readonly favsAlbumTypeormRepository: Repository<FavoriteAlbum>,
  ) {}

  async findAll(): Promise<FavoriteAlbum[]> {
    return this.favsAlbumTypeormRepository.find({ relations: ['album'] });
  }

  async create(albumId: string): Promise<FavoriteAlbum> {
    const user = this.favsAlbumTypeormRepository.create({ albumId });
    return this.favsAlbumTypeormRepository.save(user);
  }

  async delete(albumId: string): Promise<boolean> {
    const result = await this.favsAlbumTypeormRepository.delete({ albumId });
    return result.affected !== 0;
  }
}
