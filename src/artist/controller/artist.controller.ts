import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Logger,
} from '@nestjs/common';

import { ArtistService } from '../svc/artist.service';
import { ArtistDto } from '../dto/artist.dto';

const logger = new Logger('ArtistController');

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllUsers() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    try {
      return this.artistService.findById(id);
    } catch (error) {
      this.handleException(error);
    }
  }

  @Post()
  createUser(@Body() createArtistDto: ArtistDto) {
    try {
      return this.artistService.create(createArtistDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    try {
      return this.artistService.update(id, updateArtistDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    try {
      this.artistService.delete(id);
    } catch (error) {
      this.handleException(error);
    }
  }

  private handleException(error) {
    if (error instanceof HttpException) {
      throw error;
    }
    logger.error(`An unexpected error occurred:[${error.message}]`);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
