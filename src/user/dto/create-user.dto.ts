import { IsString, IsNotEmpty } from 'class-validator';
export class UserDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
