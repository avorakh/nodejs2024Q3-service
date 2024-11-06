import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
