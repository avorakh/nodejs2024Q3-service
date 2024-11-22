import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  duration: number;
  @IsOptional()
  @IsUUID('4')
  artistId: string | null;
  @IsOptional()
  @IsUUID('4')
  albumId: string | null;
}
