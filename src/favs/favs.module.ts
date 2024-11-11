import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favs.controller';
import { ArtistFavoritesService } from './svc/artist.favs.service';
import { AlbumFavoritesService } from './svc/album.favs.service';
import { TrackFavoritesService } from './svc/track.favs.service';
import { InMemoryFavoriteIdRepository } from './repository/inmemory.favs.repository';
import { ArtistRepositoryModule } from '../artist/artist.module';
import { AlbumRepositoryModule } from '../album/album.module';
import { TrackRepositoryModule } from '../track/track.module';

@Module({
  providers: [
    {
      provide: 'ArtistFavoriteIdRepository',
      useClass: InMemoryFavoriteIdRepository,
    },
  ],
  exports: ['ArtistFavoriteIdRepository'],
})
export class ArtistFavoriteIdRepositoryModule {}

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
    ArtistFavoriteIdRepositoryModule,
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
