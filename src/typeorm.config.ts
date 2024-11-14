import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './user/entity/user.entity';
import { Artist } from './artist/entity/artist.interface';

config();

export const OrmDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Artist],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
