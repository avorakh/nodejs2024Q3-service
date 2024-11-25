import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Artist } from '../../artist/entity/artist.interface';
import { ArtistRepository } from '../../artist/repository/artist.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { FavoriteArtistRepository } from '../repository/favs.artist.repository';
import { FavoriteArtist } from '../entity/favorite.artist.entity';

@Injectable()
export class ArtistFavoritesService
  implements FavoritesServiceInterface<Artist>
{
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly favoriteArtistRepository: FavoriteArtistRepository,
  ) {}

  async getAll(): Promise<Artist[]> {
    const favoriteArtists: FavoriteArtist[] =
      await this.favoriteArtistRepository.findAll();
    return favoriteArtists.map((favoriteArtist) => favoriteArtist.artist);
  }

  async addToFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundArtist = await this.artistRepository.findById(id);

    if (!foundArtist) {
      throw new FavoriteItemNotFoundException('Artist not found');
    }
    await this.favoriteArtistRepository.create(id);
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
    this.favoriteArtistRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }
}
