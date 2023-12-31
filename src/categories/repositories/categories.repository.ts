import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesGetManyResponse } from '../_types/categories.types';
import { CategoriesEntity } from '../entities/categories.entity';

@Injectable()
export class CategoriesRepository {
  private readonly logger = new Logger(CategoriesRepository.name);
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly repository: Repository<CategoriesEntity>,
  ) {}

  async getSingle(id: string): Promise<CategoriesEntity> {
    this.logger.log(`Getting a single category with id: ${id}`);
    return await this.repository.findOne({
      where: { id },
    });
  }

  async getMany(): Promise<CategoriesGetManyResponse> {
    this.logger.log(`Getting many categories`);
    return {
      data: await this.repository.find(),
    };
  }
}
