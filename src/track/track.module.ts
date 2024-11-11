import { Module } from '@nestjs/common';
import { TrackController } from './controller/track.controller';
import { TrackService } from './svc/track.service';
import { InMemoryTrackRepository } from './repository/inmemory.track.repository';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackRepository',
      useClass: InMemoryTrackRepository,
    },
  ],
  exports: ['TrackRepository'],
})
export class TrackModule {}
