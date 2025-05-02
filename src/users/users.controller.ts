import { Body, Controller, Post, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from 'src/typeorm/entities/User';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  @SetMetadata('role', 'admin') // Gerekli rolü belirtiyoruz
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    await this.usersService.createUser(createUserDto);
    return { message: 'User created successfully' };
  }
}