import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Track } from '../entity/track.interface';
import { TrackRepository } from '../repository/track.repository';
import { TrackDto } from '../dto/track.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { TrackNotFoundException } from '../error/track.not.found.error';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findById(id: string): Promise<Track> {
    this.validateId(id);
    return this.findTrack(id);
  }

  async create(trackDto: TrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name: trackDto.name,
      duration: trackDto.duration,
      artistId: trackDto.artistId,
      albumId: trackDto.albumId,
    };
    return this.trackRepository.create(newTrack);
  }

  async update(id: string, trackDto: TrackDto): Promise<Track> {
    this.validateId(id);
    await this.findTrack(id);
    const updatedTrack = await this.trackRepository.update(id, {
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

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const success = await this.trackRepository.delete(id);
    if (!success) {
      throw new TrackNotFoundException();
    }
  }

  async hideAlbumId(albumId: string): Promise<void> {
    const foundTracks = await this.findAll();
    foundTracks
      .filter((foundTrack) => foundTrack.albumId === albumId)
      .forEach(async (foundTrack) => {
        foundTrack.albumId = null;
        await this.trackRepository.update(foundTrack.id, foundTrack);
      });
  }

  async hideArtistId(artistId: string): Promise<void> {
    const foundTracks = await this.findAll();
    foundTracks
      .filter((foundTrack) => foundTrack.artistId === artistId)
      .forEach(async (foundTrack) => {
        foundTrack.artistId = null;
        await this.trackRepository.update(foundTrack.id, foundTrack);
      });
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private async findTrack(id: string): Promise<Track> {
    const foundAlbum = await this.trackRepository.findById(id);
    if (!foundAlbum) {
      throw new TrackNotFoundException();
    }
    return foundAlbum;
  }
}
