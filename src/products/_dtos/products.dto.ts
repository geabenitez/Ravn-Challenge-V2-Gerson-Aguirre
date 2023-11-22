import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsMimeType,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CategoriesGetSingleResponse } from '../../categories/_types/categories.types';
import { ProductImages } from '../_types/products.images.types';
import {
  ProductUpdateSingleStatusRequest,
  ProductsCreateSingleRequest,
  ProductsGetManyRequest,
  ProductsGetManyResponse,
  ProductsGetSingleResponse,
  ProductsUpdateSingleRequest,
} from '../_types/products.types';

export class DTOProductsCreateSingleRequest
  implements ProductsCreateSingleRequest
{
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of product',
    example: 'The frosty chicken',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description of product',
    example: 'The best frozen chicken in the world it can last decades',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Price of product',
    example: 10.99,
  })
  price: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'Quantity available of product',
    example: 10,
  })
  quantity: number;

  @IsNotEmpty()
  @IsUUID('all')
  category: string;
}

export class DTOProductsUpdateSingleRequest
  implements ProductsUpdateSingleRequest
{
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of product',
    example: 'The frosty chicken',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of product',
    example: 'The best frozen chicken in the world it can last decades',
  })
  description: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Price of product',
    example: 10.99,
  })
  price: number;

  @IsOptional()
  @IsUUID('all')
  category: string;
}

export class DTOProductUpdateSingleStatusRequest
  implements ProductUpdateSingleStatusRequest
{
  @IsBoolean()
  @ApiProperty({
    description: 'Status of the product',
    example: true,
  })
  isActive: boolean;
}

export class DTOProductsGetSingleResponse implements ProductsGetSingleResponse {
  name: string;
  description: string;
  price: number;
  category: CategoriesGetSingleResponse;
  images: ProductImages[];
  isActive: boolean;
}

export class DTOProductsGetManyRequest implements ProductsGetManyRequest {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ description: 'Limit for pagination', example: 10 })
  limit: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  page: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Status of the product',
    example: true,
  })
  isActive?: boolean;

  @IsOptional()
  @IsUUID('all')
  @ApiPropertyOptional({
    description: 'Category of the product',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  category?: string;
}

class ExtendedDTOProductsGetSingleResponse extends DTOProductsGetSingleResponse {
  index: number;
}
export class DTOProductsGetManyResponse implements ProductsGetManyResponse {
  count: number;
  page: number;
  limit: number;
  data: ExtendedDTOProductsGetSingleResponse[];
}

export class DTOProductsUploadImagesRequest {
  @IsArray()
  @ArrayNotEmpty()
  @IsMimeType({ each: true })
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: Express.Multer.File[];
}
