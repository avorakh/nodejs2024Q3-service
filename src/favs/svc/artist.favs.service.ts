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
    private readonly artistRepository: ArtistRepository,
    @Inject('ArtistFavoriteIdRepository')
    private readonly artistTFavoriteIdRepository: FavoriteIdRepository,
  ) {}

  async getAll(): Promise<Artist[]> {
    const favoriteIds: string[] = this.artistTFavoriteIdRepository.findAll();

    const foundArtists: Artist[] = await this.artistRepository.findAll();

    return foundArtists.filter((foundArtist) =>
      favoriteIds.includes(foundArtist.id),
    );
  }

  async addToFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundArtist = await this.artistRepository.findById(id);

    if (!foundArtist) {
      throw new FavoriteItemNotFoundException('Artist not found');
    }
    this.artistTFavoriteIdRepository.create(id);
  }

  async deleteFromFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundArtist = await this.artistRepository.findById(id);

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
