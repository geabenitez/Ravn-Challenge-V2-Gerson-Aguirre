import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../../products/services/products.service';
import {
  UsersCartCreateSingleRequest,
  UsersCartCreateSingleResponse,
} from '../_types/users.cart.types';
import { UsersCartRepository } from '../repositories/users.cart.repository';

@Injectable()
export class UsersCartService {
  private readonly logger = new Logger(UsersCartService.name);
  constructor(
    private readonly repository: UsersCartRepository,
    private readonly productService: ProductsService,
  ) {}

  async createSingle(
    user: string,
    data: UsersCartCreateSingleRequest,
  ): Promise<UsersCartCreateSingleResponse> {
    this.logger.log(
      `Adding product with id: "${data.productId}" to user with id: "${user}"`,
    );

    // Gets the product availability
    const product = await this.productService.getSingle(data.productId);

    // Gets current cart count
    const cartTotal = await this.repository.getCountByUserAndProduct(
      user,
      data.productId,
    );

    if (product.quantity < cartTotal + data.quantity) {
      return {
        message: 'Product quantity is not enough',
      };
    }
    const stored = await this.repository.createSingle(user, data);
    return {
      id: stored.id,
      message: 'Product added to cart successfully',
    };
  }

  async deleteByUser(user: string): Promise<void> {
    this.logger.log(`Deleting cart for user with id: "${user}"`);
    await this.repository.deleteByUser(user);
  }
}
