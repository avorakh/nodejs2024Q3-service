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
  async getAllArtists() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return await this.artistService.findById(id);
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    await this.artistService.delete(id);
  }
}
