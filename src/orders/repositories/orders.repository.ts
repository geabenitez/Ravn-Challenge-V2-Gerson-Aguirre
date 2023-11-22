import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UsersCartEntity } from '../../users/entities/users.cart.entity';
import { OrdersEntity } from '../entities/orders.entity';
import { OrdersDetailsRepository } from './orders.details.repository';

@Injectable()
export class OrdersRepository {
  private readonly logger = new Logger(OrdersRepository.name);
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly repository: Repository<OrdersEntity>,
    private readonly ordersDetailsRepository: OrdersDetailsRepository,
  ) {}

  async createSingle(data: UsersCartEntity[]): Promise<OrdersEntity> {
    this.logger.log(`Creating order with data: "${JSON.stringify(data)}"`);

    // Create order
    const order = await this.repository.save(
      this.repository.create({
        total: data.reduce(
          (acc, cur) => acc + cur.quantity * cur.product.price,
          0,
        ),
        user: data[0].user,
      }),
    );

    // Add the details
    await this.ordersDetailsRepository.createMany(order, data);

    return order;
  }

  async getByUser(user: string): Promise<OrdersEntity[]> {
    this.logger.log(`Getting orders for user with id: "${user}"`);
    return await this.repository.find({
      where: {
        user: Equal(user),
      },
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          ordersDetails: 'order.ordersDetails',
          product: 'ordersDetails.product',
        },
      },
    });
  }

  async getMany(): Promise<OrdersEntity[]> {
    this.logger.log(`Getting all orders`);
    return await this.repository.find({
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          user: 'order.user',
          ordersDetails: 'order.ordersDetails',
          product: 'ordersDetails.product',
        },
      },
    });
  }
}
