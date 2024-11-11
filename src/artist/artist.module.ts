import { Module } from '@nestjs/common';
import { ArtistController } from './controller/artist.controller';
import { ArtistService } from './svc/artist.service';
import { InMemoryArtistRepository } from './repository/inmemory.artist.repository';

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
  imports: [ArtistRepositoryModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
