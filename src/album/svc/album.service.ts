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

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async findById(id: string): Promise<Album> {
    this.validateId(id);
    return this.findAlbum(id);
  }

  async create(albumDto: AlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId,
    };
    return this.albumRepository.create(newAlbum);
  }

  async update(id: string, albumDto: AlbumDto): Promise<Album> {
    this.validateId(id);
    await this.findAlbum(id);
    const updatedAlbum = await this.albumRepository.update(id, {
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId,
    });
    if (!updatedAlbum) {
      throw new AlbumNotFoundException();
    }
    return updatedAlbum;
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const success = await this.albumRepository.delete(id);
    if (!success) {
      throw new AlbumNotFoundException();
    }
    this.trackService.hideAlbumId(id);
  }

  async hideArtistId(artistId: string): Promise<void> {
    const foundAlbums = await this.findAll();

    foundAlbums
      .filter((foundAlbum) => foundAlbum.artistId === artistId)
      .forEach(async (foundAlbum) => {
        foundAlbum.artistId = null;
        await this.albumRepository.update(foundAlbum.id, foundAlbum);
      });
  }

  private validateId(id: string) {
    if (!isUuid(id)) {
      throw new InvalidIDException();
    }
  }

  private async findAlbum(id: string): Promise<Album> {
    const foundAlbum = await this.albumRepository.findById(id);
    if (!foundAlbum) {
      throw new AlbumNotFoundException();
    }
    return foundAlbum;
  }
}
