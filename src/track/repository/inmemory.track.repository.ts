import { Track } from '../entity/track.interface';
import { TrackRepository } from './track.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTrackRepository implements TrackRepository {
  private tracks: Map<string, Track> = new Map();

  findAll(): Track[] {
    return Array.from(this.tracks.values());
  }

  findById(id: string): Track | undefined {
    return this.tracks.get(id);
  }

  create(newTrack: Track): Track {
    this.tracks.set(newTrack.id, newTrack);
    return newTrack;
  }

  update(id: string, track: Partial<Track>): Track | undefined {
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

  delete(id: string): boolean {
    return this.tracks.delete(id);
  }
}
