import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '../svc/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    try {
      return this.usersService.findById(id);
    } catch (error) {
      if (error.message === 'Invalid UUID') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      return this.usersService.updatePassword(id, updatePasswordDto);
    } catch (error) {
      console.log(error);
      console.log(id);
      console.log(updatePasswordDto);
      if (error.message === 'Invalid UUID') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error.message === 'Incorrect old password') {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    try {
      this.usersService.delete(id);
    } catch (error) {
      if (error.message === 'Invalid UUID') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
