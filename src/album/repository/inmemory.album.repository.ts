import { Album } from '../entity/album.interface';
import { AlbumRepository } from './album.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryAlbumRepository implements AlbumRepository {
  private albums: Map<string, Album> = new Map();

  async findAll(): Promise<Album[]> {
    return Array.from(this.albums.values());
  }
  async findById(id: string): Promise<Album | undefined> {
    return this.albums.get(id);
  }
  async create(newAlbum: Album): Promise<Album> {
    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  async update(id: string, album: Partial<Album>): Promise<Album | undefined> {
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
  async delete(id: string): Promise<boolean> {
    return this.albums.delete(id);
  }
}
