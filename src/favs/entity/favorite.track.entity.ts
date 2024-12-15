import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Track } from 'src/track/entity/track.interface';

@Entity('favorite_tracks')
export class FavoriteTrack {
  @PrimaryColumn('uuid')
  trackId: string;

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  track: Track;
}
