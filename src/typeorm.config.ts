import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './user/entity/user.entity';
import { Artist } from './artist/entity/artist.interface';
import { Album } from './album/entity/album.interface';
import { Track } from './track/entity/track.interface';
import { FavoriteArtist } from './favs/entity/favorite.artist.entity';

config();

export const OrmDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: true,
  entities: [User, Artist, Album, Track, FavoriteArtist],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
