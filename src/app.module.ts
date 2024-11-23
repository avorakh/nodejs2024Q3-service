import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favs/favs.module';
import { DataSourceModule } from './orm/orm.datasource';
import { LoggerModule } from './log/logger.module';
import { AuthenticationServiceModule, AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth.middleware';

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
    AuthenticationServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/refresh', method: RequestMethod.POST },
        { path: '/doc', method: RequestMethod.GET },
        { path: '/', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
