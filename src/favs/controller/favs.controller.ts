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
  async getAllAlbums(): Promise<FavoritesResponse> {
    const favoriteArtists = await this.artistFavoritesService.getAll();
    const favoriteAlbums = await this.albumFavoritesService.getAll();
    const favoriteTrack = await this.trackFavoritesService.getAll();
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTrack,
    };
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') artistId: string) {
    await this.artistFavoritesService.addToFavorites(artistId);
    return { artistId: artistId };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavorites(@Param('id') artistId: string) {
    await this.artistFavoritesService.deleteFromFavorites(artistId);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') albumId: string) {
    await this.albumFavoritesService.addToFavorites(albumId);
    return { albumId: albumId };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavorites(@Param('id') albumId: string) {
    await this.albumFavoritesService.deleteFromFavorites(albumId);
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') trackId: string) {
    await this.trackFavoritesService.addToFavorites(trackId);
    return { trackId: trackId };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(@Param('id') trackId: string) {
    await this.trackFavoritesService.deleteFromFavorites(trackId);
  }
}
