import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import {
  ProductsCreateSingleRequest,
  ProductsGetManyRequest,
  ProductsGetManyResponse,
  ProductsUpdateSingleRequest,
} from '../_types/products.types';
import { ProductsEntity } from '../entities/products.entity';

@Injectable()
export class ProductsRepository {
  private readonly logger = new Logger(ProductsRepository.name);
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly repository: Repository<ProductsEntity>,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getSingle(id: string): Promise<ProductsEntity> {
    this.logger.log(`Gets a single product with id: ${id}`);
    return await this.repository.findOneOrFail({
      where: { id },
      join: {
        alias: 'product',
        leftJoinAndSelect: {
          category: 'product.category',
          images: 'product.images',
        },
      },
    });
  }

  async create(data: ProductsCreateSingleRequest): Promise<ProductsEntity> {
    this.logger.log(
      `Creates a new product using data: ${JSON.stringify(data)}`,
    );

    const product = new ProductsEntity();
    for (const key in data) {
      if (data[key] !== undefined) {
        switch (key) {
          case 'category':
            product.category = await this.categoriesRepository.getSingle(
              data[key],
            );
            break;
          default:
            product[key] = data[key];
            break;
        }
      }
    }

    return await this.repository.save(this.repository.create(product));
  }

  async update(
    id: string,
    data: ProductsUpdateSingleRequest,
  ): Promise<boolean> {
    this.logger.log(
      `Updates a product with id: ${id} using data: ${JSON.stringify(data)}`,
    );

    const product = await this.getSingle(id);
    delete product.images;
    for (const key in data) {
      if (data[key] !== undefined) {
        switch (key) {
          case 'category':
            product.category = await this.categoriesRepository.getSingle(
              data[key],
            );
            break;
          default:
            product[key] = data[key];
            break;
        }
      }
    }

    await this.repository.update({ id }, product);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Deletes a product with id: ${id}`);
    await this.repository.softDelete({ id });
    return true;
  }

  async updateStatus(id: string, isActive: boolean): Promise<boolean> {
    this.logger.log(
      `Updates the status of a product with id: ${id} to: ${isActive}`,
    );
    await this.getSingle(id);
    const { affected } = await this.repository.update({ id }, { isActive });
    return affected > 0;
    return true;
  }

  async getFiltered(
    filter: ProductsGetManyRequest,
  ): Promise<ProductsGetManyResponse> {
    this.logger.log(
      `Gets a list of products using filter: ${JSON.stringify(filter)}`,
    );

    const { limit, page, isActive, category } = filter;
    const where: FindOptionsWhere<ProductsEntity> = {};

    // Filter by Status
    if (isActive == true || isActive == false) {
      where.isActive = isActive;
    }

    if (category) {
      where.category = Equal(category);
    }

    const options: FindManyOptions = {
      where,
      order: { createdAt: 'DESC' },
      join: {
        alias: 'products',
        leftJoinAndSelect: {
          category: 'products.category',
          images: 'products.images',
        },
      },
    };

    if (limit && page) {
      options.take = limit;
      options.skip = limit * page - limit;
    }

    const [data, count] = await this.repository.findAndCount(options);

    // Add numbering to the data
    const startNumber = (page - 1) * limit + 1;

    return {
      data: data.map((d, i) => ({ index: startNumber + i, ...d })),
      count,
      page,
      limit,
    };
  }
}
