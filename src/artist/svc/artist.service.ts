import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Artist } from '../entity/artist.interface';
import { ArtistRepository } from '../repository/artist.repository';
import { ArtistDto } from '../dto/artist.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { ArtistNotFoundException } from '../error/artist.not.found.error';
import { TrackService } from '../../track/svc/track.service';
import { AlbumService } from 'src/album/svc/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  async findById(id: string): Promise<Artist> {
    this.validateId(id);
    return this.findArtist(id);
  }

  async create(artistDto: ArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    };
    return this.artistRepository.create(newArtist);
  }

  async update(id: string, artistDto: ArtistDto): Promise<Artist> {
    this.validateId(id);
    await this.findArtist(id);
    const updatedArtist = await this.artistRepository.update(id, {
      name: artistDto.name,
      grammy: artistDto.grammy,
    });
    if (!updatedArtist) {
      throw new ArtistNotFoundException();
    }
    return updatedArtist;
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const success = await this.artistRepository.delete(id);
    if (!success) {
      throw new ArtistNotFoundException();
    }
    await this.albumService.hideArtistId(id);
    await this.trackService.hideArtistId(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private async findArtist(id: string): Promise<Artist> {
    const foundArtist = await this.artistRepository.findById(id);
    if (!foundArtist) {
      throw new ArtistNotFoundException();
    }
    return foundArtist;
  }
}
