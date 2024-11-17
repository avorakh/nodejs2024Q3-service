import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Album } from 'src/album/entity/album.interface';

@Entity('favorite_albums')
export class FavoriteAlbum {
  @PrimaryColumn('uuid')
  albumId: string;

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  album: Album;
}
