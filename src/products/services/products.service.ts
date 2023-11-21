import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SimpleResponse } from '../../../config/types';
import { AWSS3Service } from '../../aws/aws.s3.service';
import {
  ProductUpdateSingleStatusRequest,
  ProductsCreateSingleRequest,
  ProductsGetManyRequest,
  ProductsGetManyResponse,
  ProductsUpdateSingleRequest,
} from '../_types/products.types';
import { ProductsEntity } from '../entities/products.entity';
import { ProductsImagesRepository } from '../repositories/products.images.repository';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    private readonly repository: ProductsRepository,
    private readonly AWSS3Service: AWSS3Service,
    private readonly productImagesRepository: ProductsImagesRepository,
  ) {}

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
    await this.AWSS3Service.deleteFiles(id);
    await this.repository.delete(id);
    await this.productImagesRepository.deleteManyByProductId(id);
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

  async uploadImages(
    id: string,
    images: Express.Multer.File[],
  ): Promise<SimpleResponse> {
    this.logger.log(
      `Requests the upload of ${images.length} images for product with id: ${id}`,
    );
    const types = images.map((file) => file.mimetype);
    if (!types.every((type) => type === 'image/jpg' || type === 'image/jpeg')) {
      throw new BadRequestException('Only PNG images are allowed');
    }
    const urls = await this.AWSS3Service.uploadFiles(id, images);
    return await this.productImagesRepository.add(id, urls);
  }
}
