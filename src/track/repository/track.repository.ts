import { Track } from '../entity/track.interface';

export interface TrackRepository {
  findAll(): Track[];
  findById(id: string): Track | undefined;
  create(newTrack: Track): Track;
  update(id: string, track: Partial<Track>): Track | undefined;
  delete(id: string): boolean;
}
