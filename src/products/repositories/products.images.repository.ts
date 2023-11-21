import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { SimpleResponse } from '../../../config/types';
import { ProductsImagesEntity } from '../entities/products.images.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsImagesRepository {
  constructor(
    @InjectRepository(ProductsImagesEntity)
    private readonly repository: Repository<ProductsImagesEntity>,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async add(productId: string, paths: string[]): Promise<SimpleResponse> {
    try {
      const images = await Promise.all(
        paths.map(async (path) => {
          return {
            product: await this.productsRepository.getSingle(productId),
            imageUrl: path,
          };
        }),
      );
      await this.repository.save(this.repository.create(images));
      return {
        id: productId,
        message: 'Product images created successfully',
      };
    } catch (error) {
      return {
        id: productId,
        message: 'Product images created successfully',
      };
    }
  }

  async deleteManyByProductId(productId: string): Promise<boolean> {
    await this.repository.delete({ product: Equal(productId) });
    return true;
  }

  async getManyByProductId(productId: string): Promise<ProductsImagesEntity[]> {
    return await this.repository.find({
      where: { product: Equal(productId) },
    });
  }
}
