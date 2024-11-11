import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Artist } from '../../artist/entity/artist.interface';
import { ArtistRepository } from '../../artist/repository/artist.repository';
import { FavoriteIdRepository } from '../repository/favs.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ArtistFavoritesService
  implements FavoritesServiceInterface<Artist>
{
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
    @Inject('ArtistFavoriteIdRepository')
    private readonly artistTFavoriteIdRepository: FavoriteIdRepository,
  ) {}

  getAll(): Artist[] {
    const favoriteIds: string[] = this.artistTFavoriteIdRepository.findAll();

    return this.artistRepository
      .findAll()
      .filter((foundArtist) => favoriteIds.includes(foundArtist.id));
  }

  addToFavorites(id: string): void {
    this.validateId(id);
    this.findArtist(id);
    this.artistTFavoriteIdRepository.create(id);
  }

  deleteFromFavorites(id: string): void {
    this.validateId(id);
    this.findArtist(id);
    this.artistTFavoriteIdRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findArtist(id: string): Artist {
    const foundArtist = this.artistRepository.findById(id);

    if (!foundArtist) {
      throw new FavoriteItemNotFoundException('Favorite');
    }

    return foundArtist;
  }
}
