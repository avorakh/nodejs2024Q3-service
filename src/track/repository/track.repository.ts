import { Track } from '../entity/track.interface';

export interface TrackRepository {
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | undefined>;
  create(newTrack: Track): Promise<Track>;
  update(id: string, track: Partial<Track>): Promise<Track | undefined>;
  delete(id: string): Promise<boolean>;
}
