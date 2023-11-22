import { Injectable, Logger } from '@nestjs/common';
import { OrdersService } from '../../orders/services/orders.service';
import { ProductsService } from '../../products/services/products.service';
import {
  UsersCartGetResponse,
  UsersCartProcessAdditionRequest,
  UsersCartProcessAdditionResponse,
  UsersCartProcessPurchaseResponse,
} from '../_types/users.cart.types';
import { UsersCartRepository } from '../repositories/users.cart.repository';

@Injectable()
export class UsersCartService {
  private readonly logger = new Logger(UsersCartService.name);
  constructor(
    private readonly repository: UsersCartRepository,
    private readonly productService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async processAddition(
    user: string,
    data: UsersCartProcessAdditionRequest,
  ): Promise<UsersCartProcessAdditionResponse> {
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

  async processPurchase(
    user: string,
  ): Promise<UsersCartProcessPurchaseResponse> {
    this.logger.log(`Purchasing cart for user with id: "${user}"`);
    const cart = await this.repository.getByUser(user);

    if (!cart.length) {
      return {
        message: 'Cart is empty',
      };
    }

    const order = await this.ordersService.createSingle(cart);
    await this.repository.processCart(user, order);

    return {
      message: 'Cart purchased successfully',
    };
  }

  async deleteByUser(user: string): Promise<void> {
    this.logger.log(`Deleting cart for user with id: "${user}"`);
    await this.repository.deleteByUser(user);
  }

  async getCart(user: string): Promise<UsersCartGetResponse> {
    this.logger.log(`Getting cart for user with id: "${user}"`);
    const cart = await this.repository.getByUser(user);
    return {
      total: cart.reduce(
        (acc, cur) => acc + cur.quantity * cur.product.price,
        0,
      ),
      items: cart.map((item) => ({
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };
  }
}
