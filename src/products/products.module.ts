import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsController } from './controllers/products.controller';
import { ProductsEntity } from './entities/products.entity';
import { ProductsImagesEntity } from './entities/products.images.entity';
import { ProductsImagesRepository } from './repositories/products.images.repository';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, ProductsImagesEntity]),
    CategoriesModule,
    AwsModule,
  ],
  providers: [ProductsService, ProductsRepository, ProductsImagesRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
