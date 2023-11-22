import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { DTOSimpleResponse } from '../../shared.dto';
import {
  UsersCartGetResponse,
  UsersCartProcessAdditionRequest,
} from '../_types/users.cart.types';

export class DTOUsersCartProcessAdditionRequest
  implements UsersCartProcessAdditionRequest
{
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'Quantity of the product to add to the cart',
    example: 1,
  })
  quantity: number;

  @IsNotEmpty()
  @IsUUID('all')
  @ApiProperty({
    description: 'Id of the product to add to the cart',
  })
  productId: string;
}

export class DTOUsersCartProcessAdditionResponse extends DTOSimpleResponse {}

export class DTOUsersCartProcessPurchaseResponse extends DTOSimpleResponse {}

class DTOUsersCartGetResponseItems {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
export class DTOUsersCartGetResponse implements UsersCartGetResponse {
  total: number;
  items: DTOUsersCartGetResponseItems[];
}
