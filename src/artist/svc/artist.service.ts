import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Artist } from '../entity/artist.interface';
import { ArtistRepository } from '../repository/artist.repository';
import { ArtistDto } from '../dto/artist.dto';
import { InvalidIDException } from '../../error/invalid.id.error';
import { ArtistNotFoundException } from '../error/artist.not.found.error';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
  ) {}

  findAll(): Artist[] {
    return this.artistRepository.findAll();
  }

  findById(id: string): Artist {
    this.validateId(id);
    return this.findArtist(id);
  }

  create(artistDto: ArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    };
    return this.artistRepository.create(newArtist);
  }

  update(id: string, artistDto: ArtistDto): Artist {
    this.validateId(id);
    this.findArtist(id);
    const updatedArtist = this.artistRepository.update(id, {
      name: artistDto.name,
      grammy: artistDto.grammy,
    });
    if (!updatedArtist) {
      throw new ArtistNotFoundException();
    }
    return updatedArtist;
  }

  delete(id: string): void {
    this.validateId(id);
    const success = this.artistRepository.delete(id);
    if (!success) {
      throw new ArtistNotFoundException();
    }
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findArtist(id: string): Artist {
    const foundArtist = this.artistRepository.findById(id);
    if (!foundArtist) {
      throw new ArtistNotFoundException();
    }
    return foundArtist;
  }
}
