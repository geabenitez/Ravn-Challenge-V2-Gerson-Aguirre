import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './controllers/orders.controller';
import { OrdersDetailsEntity } from './entities/orders.details.entity';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersDetailsRepository } from './repositories/orders.details.repository';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity, OrdersDetailsEntity]),
    ProductsModule,
  ],
  providers: [OrdersService, OrdersRepository, OrdersDetailsRepository],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
