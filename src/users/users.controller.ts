import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from 'src/typeorm/entities/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) : Promise<User> {
    const user = await this.usersService.createUser(createUserDto);
    return user;
  }
}
