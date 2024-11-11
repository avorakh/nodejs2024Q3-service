import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Injectable, Inject } from '@nestjs/common';
import { InvalidIDException } from '../../error/invalid.id.error';
import { Album } from '../entity/album.interface';
import { AlbumDto } from '../dto/album.dto';
import { AlbumRepository } from '../repository/album.repository';
import { AlbumNotFoundException } from '../error/album.not.found.error';
import { TrackService } from '../../track/svc/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
    private readonly trackService: TrackService,
  ) {}

  findAll(): Album[] {
    return this.albumRepository.findAll();
  }

  findById(id: string): Album {
    this.validateId(id);
    return this.findAlbum(id);
  }

  create(albumDto: AlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId,
    };
    return this.albumRepository.create(newAlbum);
  }

  update(id: string, albumDto: AlbumDto): Album {
    this.validateId(id);
    this.findAlbum(id);
    const updatedAlbum = this.albumRepository.update(id, {
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId,
    });
    if (!updatedAlbum) {
      throw new AlbumNotFoundException();
    }
    return updatedAlbum;
  }

  delete(id: string): void {
    this.validateId(id);
    const success = this.albumRepository.delete(id);
    if (!success) {
      throw new AlbumNotFoundException();
    }
    this.trackService.hideAlbumId(id);
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private findAlbum(id: string): Album {
    const foundAlbum = this.albumRepository.findById(id);
    if (!foundAlbum) {
      throw new AlbumNotFoundException();
    }
    return foundAlbum;
  }
}
