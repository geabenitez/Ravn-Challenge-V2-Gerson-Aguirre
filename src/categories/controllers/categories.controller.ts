import { Controller, Get, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../auth/decorators/roles.decorator';
import { DTOCategoriesGetManyResponse } from '../_dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@ApiTags('CATEGORIES')
@ApiBearerAuth()
@Controller({
  path: '/',
  version: '1',
})
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);
  constructor(private readonly service: CategoriesService) {}

  @Get('/')
  @Roles(Role.Admin)
  async getMany(): Promise<DTOCategoriesGetManyResponse> {
    this.logger.log(`Requests a list of products`);
    return await this.service.getMany();
  }
}
