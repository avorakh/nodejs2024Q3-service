import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './svc/album.service';
import { TrackServiceModule } from '../track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entity/album.interface';
import { DataSourceModule } from '../orm/orm.datasource';
import { AlbumRepository } from './repository/album.repository';

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([Album])],
  providers: [AlbumRepository],
  exports: [AlbumRepository],
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
