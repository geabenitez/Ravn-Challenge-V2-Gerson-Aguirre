import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { DTOSimpleResponse } from '../../shared.dto';
import { UsersCartCreateSingleRequest } from '../_types/users.cart.types';

export class DTOUsersCartCreateSingleRequest
  implements UsersCartCreateSingleRequest
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

export class DTOUsersCartCreateSingleResponse extends DTOSimpleResponse {}
