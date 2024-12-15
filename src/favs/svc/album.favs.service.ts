import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Album } from '../../album/entity/album.interface';
import { AlbumRepository } from '../../album/repository/album.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { FavoriteAlbumRepository } from '../repository/favs.album.repository';
import { FavoriteAlbum } from '../entity/favorite.album.entity';

@Injectable()
export class AlbumFavoritesService implements FavoritesServiceInterface<Album> {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly favoriteAlbumRepository: FavoriteAlbumRepository,
  ) {}

  async getAll(): Promise<Album[]> {
    const favoriteAlbums: FavoriteAlbum[] =
      await this.favoriteAlbumRepository.findAll();

    return favoriteAlbums.map((favoriteAlbum) => favoriteAlbum.album);
  }

  async addToFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundAlbum = await this.albumRepository.findById(id);

    if (!foundAlbum) {
      throw new FavoriteItemNotFoundException('Album not found');
    }
    await this.favoriteAlbumRepository.create(id);
  }

  async deleteFromFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundAlbum = await this.albumRepository.findById(id);

    if (!foundAlbum) {
      throw new FavoriteItemNotFoundException(
        'Album not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.favoriteAlbumRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }
}
