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
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
