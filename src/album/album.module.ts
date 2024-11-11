import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './svc/album.service';
import { InMemoryAlbumRepository } from './repository/inmemory.album.repository';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumRepository',
      useClass: InMemoryAlbumRepository,
    },
  ],
  exports: ['AlbumRepository'],
})
export class AlbumModule {}
