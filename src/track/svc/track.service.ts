import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Injectable, Inject } from '@nestjs/common';
import { Track } from '../entity/track.interface';
import { TrackRepository } from '../repository/track.repository';
import { TrackDto } from '../dto/track.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { TrackNotFoundException } from '../error/track.not.found.error';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
  ) {}

  findAll(): Track[] {
    return this.trackRepository.findAll();
  }

  findById(id: string): Track {
    this.validateId(id);
    return this.findTrack(id);
  }

  create(trackDto: TrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: trackDto.name,
      duration: trackDto.duration,
      artistId: trackDto.artistId,
      albumId: trackDto.albumId,
    };
    return this.trackRepository.create(newTrack);
  }

  update(id: string, trackDto: TrackDto): Track {
    this.validateId(id);
    this.findTrack(id);
    const updatedTrack = this.trackRepository.update(id, {
      name: trackDto.name,
      duration: trackDto.duration,
      artistId: trackDto.artistId,
      albumId: trackDto.albumId,
    });
    if (!updatedTrack) {
      throw new TrackNotFoundException();
    }
    return updatedTrack;
  }

  delete(id: string): void {
    this.validateId(id);
    const success = this.trackRepository.delete(id);
    if (!success) {
      throw new TrackNotFoundException();
    }
  }

  hideAlbumId(albumId: string): void {
    const foundTracks = this.findAll().filter(
      (foundTrack) => foundTrack.albumId === albumId,
    );
    foundTracks.forEach((foundTrack) => {
      foundTrack.albumId = null;
      this.trackRepository.update(foundTrack.id, foundTrack);
    });
  }

  hideArtistId(artistId: string): void {
    const foundTracks = this.findAll().filter(
      (foundTrack) => foundTrack.artistId === artistId,
    );
    foundTracks.forEach((foundTrack) => {
      foundTrack.artistId = null;
      this.trackRepository.update(foundTrack.id, foundTrack);
    });
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findTrack(id: string): Track {
    const foundAlbum = this.trackRepository.findById(id);
    if (!foundAlbum) {
      throw new TrackNotFoundException();
    }
    return foundAlbum;
  }
}
