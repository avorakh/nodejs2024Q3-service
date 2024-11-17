import { Module } from '@nestjs/common';
import { ArtistController } from './controller/artist.controller';
import { ArtistService } from './svc/artist.service';
import { ArtistRepository } from './repository/artist.repository';
import { TrackServiceModule } from '../track/track.module';
import { AlbumServiceModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entity/artist.interface';
import { DataSourceModule } from '../orm/orm.datasource';

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([Artist])],
  providers: [ArtistRepository],
  exports: [ArtistRepository],
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
