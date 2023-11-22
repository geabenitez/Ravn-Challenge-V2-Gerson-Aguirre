import { Injectable, Logger } from '@nestjs/common';
import { format } from 'date-fns';
import { UsersCartEntity } from '../../users/entities/users.cart.entity';
import {
  OrdersGetManyResponse,
  OrdersGetSingleResponse,
} from '../_types/orders.types';
import { OrdersEntity } from '../entities/orders.entity';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(private readonly repository: OrdersRepository) {}

  async createSingle(data: UsersCartEntity[]): Promise<OrdersEntity> {
    this.logger.log(`Creating single order`);
    return await this.repository.createSingle(data);
  }

  parseOrders(
    orders: OrdersEntity[],
    showClient = false,
  ): OrdersGetManyResponse {
    return {
      data: orders.map((order) => {
        const obj: OrdersGetSingleResponse = {
          id: order.id,
          date: format(new Date(order.createdAt), 'dd/MM/yyyy'),
          total: order.total,
          items: order.ordersDetails.map((detail) => ({
            name: detail.product.name,
            description: detail.product.description,
            price: detail.product.price,
            quantity: detail.quantity,
          })),
        };

        if (showClient) {
          obj.client = order.user.username;
        }

        return obj;
      }),
    };
  }

  async getByUser(user: string): Promise<OrdersGetManyResponse> {
    this.logger.log(`Getting orders for user with id: "${user}"`);
    const orders = await this.repository.getByUser(user);
    return this.parseOrders(orders);
  }

  async getMany(): Promise<OrdersGetManyResponse> {
    this.logger.log(`Getting all orders`);
    const orders = await this.repository.getMany();
    return this.parseOrders(orders, true);
  }
}
