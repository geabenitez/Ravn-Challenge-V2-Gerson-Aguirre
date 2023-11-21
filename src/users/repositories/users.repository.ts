import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { AuthProcessSignUpRequest } from '../../auth/_types/auth.types';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async getSinglByUsername(username: string): Promise<UsersEntity> {
    this.logger.log(`Getting user by username: "${username}"`);
    return await this.repository.findOne({ where: { username } });
  }

  async getSingle(id: string): Promise<UsersEntity> {
    this.logger.log(`Getting user by id: "${id}"`);
    return await this.repository.findOne({ where: { id } });
  }

  async create(data: AuthProcessSignUpRequest): Promise<UsersEntity> {
    this.logger.log(`Creating user with username: "${data.username}"`);
    const user = this.repository.create({
      username: data.username,
      password: bcrypt.hashSync(data.password, 10),
    });
    return await this.repository.save(user);
  }
}
