import { Injectable, Logger } from '@nestjs/common';
import { OrdersGetManyResponse } from '../../orders/_types/orders.types';
import { OrdersService } from '../../orders/services/orders.service';

@Injectable()
export class UsersOrdersService {
  private readonly logger = new Logger(UsersOrdersService.name);
  constructor(private readonly ordersService: OrdersService) {}

  async getOrders(user: string): Promise<OrdersGetManyResponse> {
    this.logger.log(`Getting orders for user with id: "${user}"`);
    return await this.ordersService.getByUser(user);
  }
}
