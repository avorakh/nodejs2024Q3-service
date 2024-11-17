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

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([FavoriteArtist])],
  providers: [FavoriteArtistRepository],
  exports: [FavoriteArtistRepository],
})
export class FavoriteArtistRepositoryModule {}

@Module({
  providers: [
    {
      provide: 'AlbumFavoriteIdRepository',
      useClass: InMemoryFavoriteIdRepository,
    },
  ],
  exports: ['AlbumFavoriteIdRepository'],
})
export class AlbumFavoriteIdRepositoryModule {}

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
    AlbumFavoriteIdRepositoryModule,
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
