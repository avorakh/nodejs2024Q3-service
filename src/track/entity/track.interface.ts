export interface Track {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
}
