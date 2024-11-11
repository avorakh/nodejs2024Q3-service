import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './svc/album.service';
import { InMemoryAlbumRepository } from './repository/inmemory.album.repository';

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
  imports: [AlbumRepositoryModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
