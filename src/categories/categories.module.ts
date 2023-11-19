import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CategoriesEntity } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [CategoriesRepository],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
