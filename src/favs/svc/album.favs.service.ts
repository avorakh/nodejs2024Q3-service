import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Album } from '../../album/entity/album.interface';
import { AlbumRepository } from '../../album/repository/album.repository';
import { FavoriteIdRepository } from '../repository/favs.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AlbumFavoritesService implements FavoritesServiceInterface<Album> {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
    @Inject('AlbumFavoriteIdRepository')
    private readonly albumFavoriteIdRepository: FavoriteIdRepository,
  ) {}

  getAll(): Album[] {
    const favoriteIds: string[] = this.albumFavoriteIdRepository.findAll();

    return this.albumRepository
      .findAll()
      .filter((foundAlbum) => favoriteIds.includes(foundAlbum.id));
  }

  addToFavorites(id: string): void {
    this.validateId(id);
    this.findAlbum(id);
    this.albumFavoriteIdRepository.create(id);
  }

  deleteFromFavorites(id: string): void {
    this.validateId(id);
    this.findAlbum(id);
    this.albumFavoriteIdRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findAlbum(id: string): Album {
    const foundAlbum = this.albumRepository.findById(id);

    if (!foundAlbum) {
      throw new FavoriteItemNotFoundException('Favorite');
    }

    return foundAlbum;
  }
}
