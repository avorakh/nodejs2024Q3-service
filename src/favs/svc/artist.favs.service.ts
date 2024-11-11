import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Artist } from '../../artist/entity/artist.interface';
import { ArtistRepository } from '../../artist/repository/artist.repository';
import { FavoriteIdRepository } from '../repository/favs.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { HttpStatus } from '@nestjs/common';
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
    const foundArtist = this.artistRepository.findById(id);

    if (!foundArtist) {
      throw new FavoriteItemNotFoundException('Artist not found');
    }
    this.artistTFavoriteIdRepository.create(id);
  }

  deleteFromFavorites(id: string): void {
    this.validateId(id);
    const foundArtist = this.artistRepository.findById(id);

    if (!foundArtist) {
      throw new FavoriteItemNotFoundException(
        'Artist not found',
        HttpStatus.NOT_FOUND,
      );
    }
    this.artistTFavoriteIdRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }
}
