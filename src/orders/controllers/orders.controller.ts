import { Controller, Get, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../auth/decorators/roles.decorator';
import { DTOOrdersGetManyResponse } from '../_dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@ApiTags('ORDERS')
@ApiBearerAuth()
@Controller({
  path: '/orders',
  version: '1',
})
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly service: OrdersService) {}

  @Get('/')
  @Roles(Role.Admin)
  async getOrders(): Promise<DTOOrdersGetManyResponse> {
    this.logger.log('Request all the orders');
    return await this.service.getMany();
  }
}
