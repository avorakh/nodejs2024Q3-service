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

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly artistFavoritesService: ArtistFavoritesService,
  ) {}

  @Get()
  getAllAlbums(): FavoritesResponse {
    const favoriteArtists = this.artistFavoritesService.getAll();
    return {
      artists: favoriteArtists,
      albums: [],
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
}
