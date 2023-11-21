import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/user.decorator';
import {
  DTOUsersCartCreateSingleRequest,
  DTOUsersCartCreateSingleResponse,
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

  @Post()
  @Roles(Role.Client)
  async create(
    @GetUser() user: string,
    @Body() data: DTOUsersCartCreateSingleRequest,
  ): Promise<DTOUsersCartCreateSingleResponse> {
    this.logger.log('Requests the creation of a new cart');
    return await this.service.createSingle(user, data);
  }
}
