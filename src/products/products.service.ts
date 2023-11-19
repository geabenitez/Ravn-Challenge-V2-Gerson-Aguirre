import { Injectable, Logger } from '@nestjs/common';
import { SimpleResponse } from '../../config/types';
import { ProductsEntity } from './entities/products.entity';
import { ProductsRepository } from './products.repository';
import {
  ProductUpdateSingleStatusRequest,
  ProductsCreateSingleRequest,
  ProductsGetManyRequest,
  ProductsGetManyResponse,
  ProductsUpdateSingleRequest,
} from './products.types';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(private readonly repository: ProductsRepository) {}

  async create(data: ProductsCreateSingleRequest): Promise<SimpleResponse> {
    this.logger.log(
      `Requests the creation of a new product using data: ${JSON.stringify(
        data,
      )}`,
    );
    const { id } = await this.repository.create(data);
    return {
      id,
      message: 'Product created successfully',
    };
  }

  async update(
    id: string,
    data: ProductsUpdateSingleRequest,
  ): Promise<SimpleResponse> {
    this.logger.log(
      `Requests the update of a product with id: ${id} using data: ${JSON.stringify(
        data,
      )}`,
    );
    await this.repository.update(id, data);
    return {
      id,
      message: 'Product updated successfully',
    };
  }

  async delete(id: string): Promise<SimpleResponse> {
    this.logger.log(`Requests the deletion of a product with id: ${id}`);
    await this.repository.delete(id);
    return {
      id,
      message: 'Product deleted successfully',
    };
  }

  async updateStatus(
    id: string,
    { isActive }: ProductUpdateSingleStatusRequest,
  ): Promise<SimpleResponse> {
    this.logger.log(
      `Requests the update of a product with id: ${id} to ${
        isActive ? 'active' : 'inactive'
      }`,
    );
    await this.repository.updateStatus(id, isActive);
    return {
      id,
      message: `Product ${isActive ? 'activated' : 'deactivated'} successfully`,
    };
  }

  async getMany(
    filter: ProductsGetManyRequest,
  ): Promise<ProductsGetManyResponse> {
    this.logger.log(
      `Requests a list of products using filter: ${JSON.stringify(filter)}`,
    );
    return await this.repository.getFiltered(filter);
  }

  async getSingle(id: string): Promise<ProductsEntity> {
    this.logger.log(`Requests a single product with id: ${id}`);
    return await this.repository.getSingle(id);
  }
}
