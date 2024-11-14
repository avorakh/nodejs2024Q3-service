import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Album } from '../../album/entity/album.interface';
import { AlbumRepository } from '../../album/repository/album.repository';
import { FavoriteIdRepository } from '../repository/favs.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { HttpStatus } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AlbumFavoritesService implements FavoritesServiceInterface<Album> {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
    @Inject('AlbumFavoriteIdRepository')
    private readonly albumFavoriteIdRepository: FavoriteIdRepository,
  ) {}

  async getAll(): Promise<Album[]> {
    const favoriteIds: string[] = this.albumFavoriteIdRepository.findAll();

    return this.albumRepository
      .findAll()
      .filter((foundAlbum) => favoriteIds.includes(foundAlbum.id));
  }

  async addToFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundAlbum = this.albumRepository.findById(id);

    if (!foundAlbum) {
      throw new FavoriteItemNotFoundException('Album not found');
    }
    this.albumFavoriteIdRepository.create(id);
  }

  async deleteFromFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundAlbum = this.albumRepository.findById(id);

    if (!foundAlbum) {
      throw new FavoriteItemNotFoundException(
        'Album not found',
        HttpStatus.NOT_FOUND,
      );
    }
    this.albumFavoriteIdRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }
}
