import { Artist } from '../entity/artist.interface';
import { ArtistRepository } from './artist.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryArtistRepository implements ArtistRepository {
  private artists: Map<string, Artist> = new Map();
  findAll(): Artist[] {
    return Array.from(this.artists.values());
  }
  findById(id: string): Artist | undefined {
    return this.artists.get(id);
  }
  create(newArtist: Artist): Artist {
    this.artists.set(newArtist.id, newArtist);
    return newArtist;
  }
  update(id: string, artist: Partial<Artist>): Artist | undefined {
    const existingArtist = this.artists.get(id);
    if (!existingArtist) {
      return undefined;
    }

    const updatedArtist = {
      ...existingArtist,
      ...artist,
    };
    this.artists.set(id, updatedArtist);
    return updatedArtist;
  }
  delete(id: string): boolean {
    return this.artists.delete(id);
  }
}
