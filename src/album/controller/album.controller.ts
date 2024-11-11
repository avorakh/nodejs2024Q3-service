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

import { AlbumService } from '../svc/album.service';
import { AlbumDto } from '../dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    return this.albumService.findById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: AlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: AlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    this.albumService.delete(id);
  }
}
