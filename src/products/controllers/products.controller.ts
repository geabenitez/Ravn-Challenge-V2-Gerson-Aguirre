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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AtLeastOneFieldPipe } from '../../../config/request-validator.pipe';
import { Public } from '../../auth/decorators/auth.decorator';
import { Role, Roles } from '../../auth/decorators/roles.decorator';
import { DTOSimpleResponse } from '../../shared.dto';
import {
  DTOProductUpdateSingleStatusRequest,
  DTOProductsCreateSingleRequest,
  DTOProductsGetManyRequest,
  DTOProductsGetManyResponse,
  DTOProductsGetSingleResponse,
  DTOProductsUpdateSingleRequest,
  DTOProductsUploadImagesRequest,
} from '../_dtos/products.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('PRODUCTS')
@Controller({
  path: '/',
  version: '1',
})
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  constructor(private readonly service: ProductsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth()
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
  @Roles(Role.Admin)
  @ApiBearerAuth()
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
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<DTOSimpleResponse> {
    this.logger.log(`Requests the deletion of a product with id: ${id}`);
    return await this.service.delete(id);
  }

  @Put('/:id/status')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async updateSingleStatus(
    @Param('id') id: string,
    @Body() data: DTOProductUpdateSingleStatusRequest,
  ): Promise<DTOSimpleResponse> {
    return this.service.updateStatus(id, data);
  }

  @Post('/:id/images')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of images',
    type: DTOProductsUploadImagesRequest,
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: DTOProductsUploadImagesRequest,
  ): Promise<DTOSimpleResponse> {
    return await this.service.uploadImages(id, files.images);
  }

  @Get('/:id')
  @Public()
  async getSingle(
    @Param('id') id: string,
  ): Promise<DTOProductsGetSingleResponse> {
    this.logger.log(`Solicitud de obtener zona con id: "${id}"`);
    return await this.service.getSingle(id);
  }

  @Get('/')
  @Public()
  async getMany(
    @Query() filter: DTOProductsGetManyRequest,
  ): Promise<DTOProductsGetManyResponse> {
    this.logger.log(
      `Requests a list of products using filter: ${JSON.stringify(filter)}`,
    );
    return await this.service.getMany(filter);
  }
}
