import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../../products/services/products.service';
import { UsersCartEntity } from '../../users/entities/users.cart.entity';
import { OrdersDetailsEntity } from '../entities/orders.details.entity';
import { OrdersEntity } from '../entities/orders.entity';

@Injectable()
export class OrdersDetailsRepository {
  private readonly logger = new Logger(OrdersDetailsRepository.name);
  constructor(
    @InjectRepository(OrdersDetailsEntity)
    private readonly repository: Repository<OrdersDetailsEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async createMany(
    order: OrdersEntity,
    data: UsersCartEntity[],
  ): Promise<void> {
    this.logger.log(
      `Creating order details with data: "${JSON.stringify(data)}"`,
    );

    const details = Promise.all(
      data.map(async (item) => {
        const product = item.product;
        await this.productsService.decreaseStock(product.id, item.quantity);
        return this.repository.create({
          order,
          product,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price * item.quantity,
        });
      }),
    );

    await this.repository.save(await details);
  }
}
