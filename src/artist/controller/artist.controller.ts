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
  getAllUsers() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.artistService.findById(id);
  }

  @Post()
  createUser(@Body() createArtistDto: ArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    this.artistService.delete(id);
  }
}
