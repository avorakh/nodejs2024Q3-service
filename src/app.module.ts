import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/artist.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UsersModule, ArtistModule, AlbumModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
