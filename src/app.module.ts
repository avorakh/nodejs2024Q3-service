import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favs/favs.module';
import { DataSourceModule } from './orm/orm.datasource';
import { LoggerModule } from './log/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggerModule,
    DataSourceModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
