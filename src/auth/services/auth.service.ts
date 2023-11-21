import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { SimpleResponse } from '../../../config/types';
import { UsersRepository } from '../../users/repositories/users.repository';
import { UsersCartService } from '../../users/services/users.cart.service';
import {
  AuthProcessSignInRequest,
  AuthProcessSignInResponse,
  AuthProcessSignUpRequest,
  JWTPayload,
} from '../_types/auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersCartService: UsersCartService,
    private readonly jwtService: JwtService,
  ) {}

  async processSignIn(
    data: AuthProcessSignInRequest,
  ): Promise<AuthProcessSignInResponse> {
    const { username, password } = data;
    this.logger.log(`Validating user ${username}`);

    const user = await this.usersRepository.getSinglByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JWTPayload = { uid: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async processSignUp(data: AuthProcessSignUpRequest): Promise<SimpleResponse> {
    this.logger.log(`Processing register`);
    const { id } = await this.usersRepository.create(data);
    return {
      id,
      message: 'User created successfully',
    };
  }

  async processSignOut(user: string): Promise<SimpleResponse> {
    this.logger.log(`Processing sign out`);
    await this.usersCartService.deleteByUser(user);
    return {
      message: 'User signed out successfully',
    };
  }
}
