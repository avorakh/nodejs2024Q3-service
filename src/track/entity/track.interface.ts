import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'int' })
  duration: number;
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;
  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;
}
