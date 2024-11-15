import { Track } from '../entity/track.interface';
import { TrackRepository } from './track.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTrackRepository implements TrackRepository {
  private tracks: Map<string, Track> = new Map();

  async findAll(): Promise<Track[]> {
    return Array.from(this.tracks.values());
  }

  async findById(id: string): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async create(newTrack: Track): Promise<Track> {
    this.tracks.set(newTrack.id, newTrack);
    return newTrack;
  }

  async update(id: string, track: Partial<Track>): Promise<Track | undefined> {
    const existingTrack = this.tracks.get(id);
    if (!existingTrack) {
      return undefined;
    }

    const updatedTrack = {
      ...existingTrack,
      ...track,
    };
    this.tracks.set(id, updatedTrack);
    return updatedTrack;
  }

  async delete(id: string): Promise<boolean> {
    return this.tracks.delete(id);
  }
}
