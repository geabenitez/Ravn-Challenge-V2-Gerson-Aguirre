import { Controller, Get, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/user.decorator';
import { DTOUsersOrdersGetManyResponse } from '../_dtos/users.orders.dto';
import { UsersOrdersService } from '../services/users.orders.service';

@ApiTags('CART')
@ApiBearerAuth()
@Controller({
  path: '/orders',
  version: '1',
})
export class UsersOrdersController {
  private readonly logger = new Logger(UsersOrdersController.name);
  constructor(private readonly service: UsersOrdersService) {}

  @Get('/')
  @Roles(Role.Client)
  async getOrders(
    @GetUser() user: string,
  ): Promise<DTOUsersOrdersGetManyResponse> {
    this.logger.log('Request the orders of a user');
    return await this.service.getOrders(user);
  }
}
