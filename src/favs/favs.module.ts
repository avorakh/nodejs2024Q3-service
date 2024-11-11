import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favs.controller';
import { ArtistFavoritesService } from './svc/artist.favs.service';
import { InMemoryFavoriteIdRepository } from './repository/inmemory.favs.repository';
import { ArtistRepositoryModule } from '../artist/artist.module';

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
  imports: [ArtistRepositoryModule, ArtistFavoriteIdRepositoryModule],
  controllers: [FavoriteController],
  providers: [
    ArtistFavoritesService,
    {
      provide: 'ArtistFavoriteIdRepository',
      useClass: InMemoryFavoriteIdRepository,
    },
  ],
  exports: ['ArtistFavoriteIdRepository'],
})
export class FavoritesModule {}
