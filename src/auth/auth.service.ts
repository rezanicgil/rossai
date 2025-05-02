import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { ValidateUserParams } from 'src/utils/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    validateUserParams: ValidateUserParams,
  ): Promise<User | null> {
    const user = await this.userService.findOneByEmail(
      validateUserParams.email,
    );
    if (
      user &&
      (await this.comparePasswords(validateUserParams.password, user.password))
    ) {
      return user;
    }
    return null;
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(userId: string, role: string, email: string): Promise<string> {
    const payload = { sub: userId, role, email };
    return this.jwtService.sign(payload);
  }
}
