import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsUUID,
} from 'class-validator';
export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsOptional()
  @IsUUID('4')
  artistId: string | null;
}
