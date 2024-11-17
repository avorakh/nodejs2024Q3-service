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
  async getAllAlbums() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return await this.albumService.findById(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: AlbumDto) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    await this.albumService.delete(id);
  }
}
