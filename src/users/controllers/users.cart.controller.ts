import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/user.decorator';
import {
  DTOUsersCartGetResponse,
  DTOUsersCartProcessAdditionRequest,
  DTOUsersCartProcessAdditionResponse,
  DTOUsersCartProcessPurchaseResponse,
} from '../_dtos/users.cart.dto';
import { UsersCartService } from '../services/users.cart.service';

@ApiTags('CART')
@ApiBearerAuth()
@Controller({
  path: '/cart',
  version: '1',
})
export class UsersCartController {
  private readonly logger = new Logger(UsersCartController.name);
  constructor(private readonly service: UsersCartService) {}

  @Post('/add')
  @Roles(Role.Client)
  async processAddition(
    @GetUser() user: string,
    @Body() data: DTOUsersCartProcessAdditionRequest,
  ): Promise<DTOUsersCartProcessAdditionResponse> {
    this.logger.log('Requests the creation of a new cart');
    return await this.service.processAddition(user, data);
  }

  @Post('/purchase')
  @Roles(Role.Client)
  async processPurchase(
    @GetUser() user: string,
  ): Promise<DTOUsersCartProcessPurchaseResponse> {
    this.logger.log('Request the purchase of a cart');
    return await this.service.processPurchase(user);
  }

  @Get('/')
  @Roles(Role.Client)
  async getCart(@GetUser() user: string): Promise<DTOUsersCartGetResponse> {
    this.logger.log('Request the cart of a user');
    return await this.service.getCart(user);
  }
}
