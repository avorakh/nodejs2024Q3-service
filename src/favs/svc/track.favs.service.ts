import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Track } from '../../track/entity/track.interface';
import { TrackRepository } from '../../track/repository/track.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { FavoriteTrack } from '../entity/favorite.track.entity';
import { FavoriteTrackRepository } from '../repository/favs.track.repository';

@Injectable()
export class TrackFavoritesService implements FavoritesServiceInterface<Track> {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly favoriteTrackRepository: FavoriteTrackRepository,
  ) {}

  async getAll(): Promise<Track[]> {
    const favoriteTracks: FavoriteTrack[] =
      await this.favoriteTrackRepository.findAll();

    return favoriteTracks.map((favoriteTrack) => favoriteTrack.track);
  }

  async addToFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundTrack = await this.trackRepository.findById(id);

    if (!foundTrack) {
      throw new FavoriteItemNotFoundException('Track not found');
    }
    await this.favoriteTrackRepository.create(id);
  }

  async deleteFromFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundTrack = await this.trackRepository.findById(id);

    if (!foundTrack) {
      throw new FavoriteItemNotFoundException(
        'Track not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.favoriteTrackRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }
}
