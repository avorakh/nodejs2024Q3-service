import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favs.controller';
import { ArtistFavoritesService } from './svc/artist.favs.service';
import { AlbumFavoritesService } from './svc/album.favs.service';
import { TrackFavoritesService } from './svc/track.favs.service';
import { ArtistRepositoryModule } from '../artist/artist.module';
import { AlbumRepositoryModule } from '../album/album.module';
import { TrackRepositoryModule } from '../track/track.module';
import { FavoriteArtistRepository } from './repository/favs.artist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteArtist } from './entity/favorite.artist.entity';
import { DataSourceModule } from '../orm/orm.datasource';
import { FavoriteAlbum } from './entity/favorite.album.entity';
import { FavoriteAlbumRepository } from './repository/favs.album.repository';
import { FavoriteTrack } from './entity/favorite.track.entity';
import { FavoriteTrackRepository } from './repository/favs.track.repository';

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([FavoriteArtist])],
  providers: [FavoriteArtistRepository],
  exports: [FavoriteArtistRepository],
})
export class FavoriteArtistRepositoryModule {}

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([FavoriteAlbum])],
  providers: [FavoriteAlbumRepository],
  exports: [FavoriteAlbumRepository],
})
export class FavoriteAlbumRepositoryModule {}

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([FavoriteTrack])],
  providers: [FavoriteTrackRepository],
  exports: [FavoriteTrackRepository],
})
export class FavoriteTrackRepositoryModule {}

@Module({
  imports: [
    ArtistRepositoryModule,
    FavoriteArtistRepositoryModule,
    AlbumRepositoryModule,
    FavoriteAlbumRepositoryModule,
    TrackRepositoryModule,
    FavoriteTrackRepositoryModule,
  ],
  controllers: [FavoriteController],
  providers: [
    ArtistFavoritesService,
    AlbumFavoritesService,
    TrackFavoritesService,
  ],
})
export class FavoritesModule {}
