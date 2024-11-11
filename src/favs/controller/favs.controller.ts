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

import { AlbumFavoritesService } from '../svc/album.favs.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly artistFavoritesService: ArtistFavoritesService,
    private readonly albumFavoritesService: AlbumFavoritesService,
  ) {}

  @Get()
  getAllAlbums(): FavoritesResponse {
    const favoriteArtists = this.artistFavoritesService.getAll();
    const favoriteAlbums = this.albumFavoritesService.getAll();
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: [],
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
  addAlbumToFavorites(@Param('id') artistId: string) {
    this.albumFavoritesService.addToFavorites(artistId);
    return { artistId: artistId };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') artistId: string) {
    this.albumFavoritesService.deleteFromFavorites(artistId);
  }
}
