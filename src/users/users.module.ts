import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { UsersCartController } from './controllers/users.cart.controller';
import { UsersOrdersController } from './controllers/users.orders.controller';
import { UsersCartEntity } from './entities/users.cart.entity';
import { UsersEntity } from './entities/users.entity';
import { UsersCartRepository } from './repositories/users.cart.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersCartService } from './services/users.cart.service';
import { UsersOrdersService } from './services/users.orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersCartEntity]),
    ProductsModule,
    OrdersModule,
  ],
  providers: [
    UsersCartService,
    UsersCartRepository,
    UsersRepository,
    UsersOrdersService,
  ],
  controllers: [UsersCartController, UsersOrdersController],
  exports: [UsersRepository, UsersCartService, UsersCartRepository],
})
export class UsersModule {}
