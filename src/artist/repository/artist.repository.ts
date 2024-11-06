import { Artist } from '../entity/artist.interface';

export interface ArtistRepository {
  findAll(): Artist[];
  findById(id: string): Artist | undefined;
  create(newArtist: Artist): Artist;
  update(id: string, artist: Partial<Artist>): Artist | undefined;
  delete(id: string): boolean;
}
