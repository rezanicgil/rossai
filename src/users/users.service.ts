import { Injectable } from '@nestjs/common';
import { User } from '../typeorm/entities/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  createUser( createUserParams: CreateUserParams): Promise<User> {
    return this.userRepository.save(createUserParams);
  }
  
}
