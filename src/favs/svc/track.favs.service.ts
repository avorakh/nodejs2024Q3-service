import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Track } from '../../track/entity/track.interface';
import { TrackRepository } from '../../track/repository/track.repository';
import { FavoriteIdRepository } from '../repository/favs.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class TrackFavoritesService implements FavoritesServiceInterface<Track> {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
    @Inject('TrackFavoriteIdRepository')
    private readonly trackFavoriteIdRepository: FavoriteIdRepository,
  ) {}

  async getAll(): Promise<Track[]> {
    const favoriteIds: string[] = this.trackFavoriteIdRepository.findAll();
    const foundTracks: Track[] = await this.trackRepository.findAll();
    return foundTracks.filter((foundTrack) =>
      favoriteIds.includes(foundTrack.id),
    );
  }

  async addToFavorites(id: string): Promise<void> {
    this.validateId(id);
    const foundTrack = await this.trackRepository.findById(id);

    if (!foundTrack) {
      throw new FavoriteItemNotFoundException('Track not found');
    }
    this.trackFavoriteIdRepository.create(id);
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
    this.trackFavoriteIdRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }
}
