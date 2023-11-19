import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AtLeastOneFieldPipe } from '../../config/request-validator.pipe';
import { DTOSimpleResponse } from '../shared.dto';
import {
  DTOProductUpdateSingleStatusRequest,
  DTOProductsCreateSingleRequest,
  DTOProductsGetManyRequest,
  DTOProductsGetManyResponse,
  DTOProductsGetSingleResponse,
  DTOProductsUpdateSingleRequest,
} from './products.dto';
import { ProductsService } from './products.service';

@Controller({
  path: '/',
  version: '1',
})
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  constructor(private readonly service: ProductsService) {}

  @Post()
  async create(
    @Body() data: DTOProductsCreateSingleRequest,
  ): Promise<DTOSimpleResponse> {
    this.logger.log(
      `Requests the creation of a new product using data: ${JSON.stringify(
        data,
      )}`,
    );
    return await this.service.create(data);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(new AtLeastOneFieldPipe()) data: DTOProductsUpdateSingleRequest,
  ): Promise<DTOSimpleResponse> {
    this.logger.log(
      `Requests the update of a product with id: ${id} using data: ${JSON.stringify(
        data,
      )}`,
    );
    return await this.service.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<DTOSimpleResponse> {
    this.logger.log(`Requests the deletion of a product with id: ${id}`);
    return await this.service.delete(id);
  }

  @Put('/:id/status')
  async updateSingleStatus(
    @Param('id') id: string,
    @Body() data: DTOProductUpdateSingleStatusRequest,
  ): Promise<DTOSimpleResponse> {
    return this.service.updateStatus(id, data);
  }

  @Get('/:id')
  async getSingle(
    @Param('id') id: string,
  ): Promise<DTOProductsGetSingleResponse> {
    this.logger.log(`Solicitud de obtener zona con id: "${id}"`);
    return await this.service.getSingle(id);
  }

  @Get('/')
  async getMany(
    @Query() filter: DTOProductsGetManyRequest,
  ): Promise<DTOProductsGetManyResponse> {
    this.logger.log(
      `Requests a list of products using filter: ${JSON.stringify(filter)}`,
    );
    return await this.service.getMany(filter);
  }
}
