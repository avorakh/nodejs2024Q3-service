import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmDataSource } from './typeorm.config';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmDataSource.options),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
