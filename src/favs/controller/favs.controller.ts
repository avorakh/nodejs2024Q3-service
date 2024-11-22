import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesResponse } from '../model/favorites.response';
import { ArtistFavoritesService } from '../svc/artist.favs.service';
import { TrackFavoritesService } from '../svc/track.favs.service';
import { AlbumFavoritesService } from '../svc/album.favs.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly artistFavoritesService: ArtistFavoritesService,
    private readonly albumFavoritesService: AlbumFavoritesService,
    private readonly trackFavoritesService: TrackFavoritesService,
  ) {}

  @Get()
  getAllAlbums(): FavoritesResponse {
    const favoriteArtists = this.artistFavoritesService.getAll();
    const favoriteAlbums = this.albumFavoritesService.getAll();
    const favoriteTrack = this.trackFavoritesService.getAll();
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTrack,
    };
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') artistId: string) {
    this.artistFavoritesService.addToFavorites(artistId);
    return { artistId: artistId };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') artistId: string) {
    this.artistFavoritesService.deleteFromFavorites(artistId);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') albumId: string) {
    this.albumFavoritesService.addToFavorites(albumId);
    return { albumId: albumId };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') albumId: string) {
    this.albumFavoritesService.deleteFromFavorites(albumId);
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') trackId: string) {
    this.trackFavoritesService.addToFavorites(trackId);
    return { trackId: trackId };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') trackId: string) {
    this.trackFavoritesService.deleteFromFavorites(trackId);
  }
}
