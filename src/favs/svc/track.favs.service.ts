import { validate as isUuid } from 'uuid';
import { FavoritesServiceInterface } from './favs.service.interface';
import { Track } from '../../track/entity/track.interface';
import { TrackRepository } from '../../track/repository/track.repository';
import { FavoriteIdRepository } from '../repository/favs.repository';
import { FavoriteItemNotFoundException } from '../error/favirite.not.found.error';
import { InvalidIDException } from '../../error/invalid.id.error';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TrackFavoritesService implements FavoritesServiceInterface<Track> {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
    @Inject('TrackFavoriteIdRepository')
    private readonly trackFavoriteIdRepository: FavoriteIdRepository,
  ) {}

  getAll(): Track[] {
    const favoriteIds: string[] = this.trackFavoriteIdRepository.findAll();

    return this.trackRepository
      .findAll()
      .filter((foundTrack) => favoriteIds.includes(foundTrack.id));
  }

  addToFavorites(id: string): void {
    this.validateId(id);
    this.findTrack(id);
    this.trackFavoriteIdRepository.create(id);
  }

  deleteFromFavorites(id: string): void {
    this.validateId(id);
    this.findTrack(id);
    this.trackFavoriteIdRepository.delete(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findTrack(id: string): Track {
    const foundTrack = this.trackRepository.findById(id);

    if (!foundTrack) {
      throw new FavoriteItemNotFoundException('Favorite');
    }

    return foundTrack;
  }
}
