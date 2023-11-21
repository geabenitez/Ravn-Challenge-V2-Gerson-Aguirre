import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { UsersCartController } from './controllers/users.cart.controller';
import { UsersCartEntity } from './entities/users.cart.entity';
import { UsersEntity } from './entities/users.entity';
import { UsersCartRepository } from './repositories/users.cart.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersCartService } from './services/users.cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersCartEntity]),
    ProductsModule,
  ],
  providers: [UsersCartService, UsersCartRepository, UsersRepository],
  controllers: [UsersCartController],
  exports: [UsersRepository, UsersCartService],
})
export class UsersModule {}
