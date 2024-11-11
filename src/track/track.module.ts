import { Module } from '@nestjs/common';
import { TrackController } from './controller/track.controller';
import { TrackService } from './svc/track.service';
import { InMemoryTrackRepository } from './repository/inmemory.track.repository';

@Module({
  providers: [
    {
      provide: 'TrackRepository',
      useClass: InMemoryTrackRepository,
    },
  ],
  exports: ['TrackRepository'],
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
