import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ArtistService } from '../svc/artist.service';
import { ArtistDto } from '../dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.artistService.findById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: ArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() updateArtistDto: ArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    this.artistService.delete(id);
  }
}
