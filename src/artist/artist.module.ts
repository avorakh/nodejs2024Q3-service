import { Module } from '@nestjs/common';
import { ArtistController } from './controller/artist.controller';
import { ArtistService } from './svc/artist.service';
import { InMemoryArtistRepository } from './repository/inmemory.artist.repository';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistRepository',
      useClass: InMemoryArtistRepository,
    },
  ],
  exports: ['ArtistRepository'],
})
export class ArtistModule {}
