import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './svc/album.service';
import { InMemoryAlbumRepository } from './repository/inmemory.album.repository';
import { TrackServiceModule } from '../track/track.module';

@Module({
  providers: [
    {
      provide: 'AlbumRepository',
      useClass: InMemoryAlbumRepository,
    },
  ],
  exports: ['AlbumRepository'],
})
export class AlbumRepositoryModule {}

@Module({
  imports: [AlbumRepositoryModule, TrackServiceModule],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumServiceModule {}

@Module({
  imports: [AlbumServiceModule],
  controllers: [AlbumController],
})
export class AlbumModule {}
