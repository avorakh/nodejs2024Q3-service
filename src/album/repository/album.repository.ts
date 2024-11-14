import { Album } from '../entity/album.interface';

export interface AlbumRepository {
  findAll(): Promise<Album[]>;
  findById(id: string): Promise<Album | undefined>;
  create(newAlbum: Album): Promise<Album>;
  update(id: string, album: Partial<Album>): Promise<Album | undefined>;
  delete(id: string): Promise<boolean>;
}
