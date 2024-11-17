import { Module } from '@nestjs/common';
import { TrackController } from './controller/track.controller';
import { TrackService } from './svc/track.service';
import { Track } from './entity/track.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceModule } from '../orm/orm.datasource';
import { TrackRepository } from './repository/track.repository';

@Module({
  imports: [DataSourceModule, TypeOrmModule.forFeature([Track])],
  providers: [TrackRepository],
  exports: [TrackRepository],
})
export class TrackRepositoryModule {}

@Module({
  imports: [TrackRepositoryModule],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackServiceModule {}

@Module({
  imports: [TrackServiceModule],
  controllers: [TrackController],
})
export class TrackModule {}
