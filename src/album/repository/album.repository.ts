import { Album } from '../entity/album.interface';

export interface AlbumRepository {
  findAll(): Album[];
  findById(id: string): Album | undefined;
  create(newAlbum: Album): Album;
  update(id: string, album: Partial<Album>): Album | undefined;
  delete(id: string): boolean;
}
