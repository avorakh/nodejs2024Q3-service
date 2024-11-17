import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favs.controller';
import { ArtistFavoritesService } from './svc/artist.favs.service';
import { AlbumFavoritesService } from './svc/album.favs.service';
import { TrackFavoritesService } from './svc/track.favs.service';
import { InMemoryFavoriteIdRepository } from './repository/inmemory.favs.repository';
import { ArtistRepositoryModule } from '../artist/artist.module';
import { AlbumRepositoryModule } from '../album/album.module';
import { TrackRepositoryModule } from '../track/track.module';
import { FavoriteArtistRepository } from './repository/favs.artist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteArtist } from './entity/favorite.artist.entity';
import { DataSourceModule } from '../orm/orm.datasource';
import { FavoriteAlbum } from './entity/favorite.album.entity';
import { FavoriteAlbumRepository } from './repository/favs.album.repository';

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
  providers: [
    {
      provide: 'TrackFavoriteIdRepository',
      useClass: InMemoryFavoriteIdRepository,
    },
  ],
  exports: ['TrackFavoriteIdRepository'],
})
export class TrackFavoriteIdRepositoryModule {}

@Module({
  imports: [
    ArtistRepositoryModule,
    FavoriteArtistRepositoryModule,
    AlbumRepositoryModule,
    FavoriteAlbumRepositoryModule,
    TrackRepositoryModule,
    TrackFavoriteIdRepositoryModule,
  ],
  controllers: [FavoriteController],
  providers: [
    ArtistFavoritesService,
    AlbumFavoritesService,
    TrackFavoritesService,
  ],
})
export class FavoritesModule {}
