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

import { TrackDto } from '../dto/track.dto';
import { TrackService } from '../svc/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    return await this.trackService.findById(id);
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() updateTrackDto: TrackDto) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    await this.trackService.delete(id);
  }
}
