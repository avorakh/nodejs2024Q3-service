import { Module } from '@nestjs/common';
import { ArtistController } from './controller/artist.controller';
import { ArtistService } from './svc/artist.service';
import { InMemoryArtistRepository } from './repository/inmemory.artist.repository';
import { TrackServiceModule } from '../track/track.module';
import { AlbumServiceModule } from '../album/album.module';
@Module({
  providers: [
    {
      provide: 'ArtistRepository',
      useClass: InMemoryArtistRepository,
    },
  ],
  exports: ['ArtistRepository'],
})
export class ArtistRepositoryModule {}

@Module({
  imports: [ArtistRepositoryModule, TrackServiceModule, AlbumServiceModule],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistServiceModule {}

@Module({
  imports: [ArtistServiceModule],
  controllers: [ArtistController],
})
export class ArtistModule {}
