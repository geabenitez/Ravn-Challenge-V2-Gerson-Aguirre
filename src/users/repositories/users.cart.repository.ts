import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Repository } from 'typeorm';
import { OrdersEntity } from '../../orders/entities/orders.entity';
import { UsersCartProcessAdditionRequest } from '../_types/users.cart.types';
import { UsersCartEntity } from '../entities/users.cart.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersCartRepository {
  private readonly logger = new Logger(UsersCartRepository.name);

  constructor(
    @InjectRepository(UsersCartEntity)
    private readonly repository: Repository<UsersCartEntity>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createSingle(
    user: string,
    data: UsersCartProcessAdditionRequest,
  ): Promise<UsersCartEntity> {
    this.logger.log(
      `Adding product with id: "${data.productId}" to user with id: "${user}"`,
    );
    const cart = this.repository.create({
      quantity: data.quantity,
      user: await this.usersRepository.getSingle(user),
      product: { id: data.productId },
    });
    return await this.repository.save(cart);
  }

  async deleteByUser(user: string): Promise<void> {
    this.logger.log(`Deleting cart for user with id: "${user}"`);
    await this.repository.softDelete({ user: Equal(user) });
  }

  async getCountByUserAndProduct(
    user: string,
    product: string,
  ): Promise<number> {
    this.logger.log(
      `Getting cart count for user with id: "${user}" and product with id: "${product}"`,
    );
    return await this.repository.sum('quantity', {
      user: Equal(user),
      product: Equal(product),
      order: IsNull(),
    });
  }

  async getByUser(user: string): Promise<UsersCartEntity[]> {
    this.logger.log(`Getting cart for user with id: "${user}"`);
    return await this.repository.find({
      where: {
        user: Equal(user),
        order: IsNull(),
      },
      relations: ['product', 'user'],
    });
  }

  async processCart(user: string, order: OrdersEntity): Promise<void> {
    this.logger.log(`Processing cart for user with id: "${user}"`);
    await this.repository.update(
      {
        user: Equal(user),
        order: IsNull(),
      },
      { order },
    );
  }
}
