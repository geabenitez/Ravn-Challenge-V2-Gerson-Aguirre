import { Injectable, Logger } from '@nestjs/common';
import { CategoriesGetManyResponse } from '../_types/categories.types';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(private readonly repository: CategoriesRepository) {}

  async getMany(): Promise<CategoriesGetManyResponse> {
    this.logger.log(`Getting many categories`);
    return await this.repository.getMany();
  }
}
