import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from 'src/artist/entity/artist.interface';

@Entity('favorite_artists')
export class FavoriteArtist {
  @PrimaryColumn('uuid')
  artistId: string;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}
