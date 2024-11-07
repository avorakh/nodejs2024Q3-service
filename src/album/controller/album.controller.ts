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
  getAllUsers() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.albumService.findById(id);
  }

  @Post()
  createUser(@Body() createAlbumDto: AlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateAlbumDto: AlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    this.albumService.delete(id);
  }
}
