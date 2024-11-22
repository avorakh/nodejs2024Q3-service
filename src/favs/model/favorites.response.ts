import { Artist } from '../../artist/entity/artist.interface';
import { Album } from '../../album/entity/album.interface';
import { Track } from '../../track/entity/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
