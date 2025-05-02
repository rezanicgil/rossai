import { Injectable } from '@nestjs/common';
import { User } from '../typeorm/entities/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/utils/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserParams: CreateUserParams): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    createUserParams.password = await bcrypt.hash(
      createUserParams.password,
      salt,
    );
    return this.userRepository.save(createUserParams);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
