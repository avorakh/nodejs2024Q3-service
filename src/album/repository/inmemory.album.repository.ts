import { Album } from '../entity/album.interface';
import { AlbumRepository } from './album.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryAlbumRepository implements AlbumRepository {
  private albums: Map<string, Album> = new Map();

  findAll(): Album[] {
    return Array.from(this.albums.values());
  }
  findById(id: string): Album | undefined {
    return this.albums.get(id);
  }
  create(newAlbum: Album): Album {
    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }
  update(id: string, album: Partial<Album>): Album | undefined {
    const existingAlbum = this.albums.get(id);
    if (!existingAlbum) {
      return undefined;
    }

    const updatedAlbum = {
      ...existingAlbum,
      ...album,
    };
    this.albums.set(id, updatedAlbum);
    return updatedAlbum;
  }
  delete(id: string): boolean {
    return this.albums.delete(id);
  }
}
