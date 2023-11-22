import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { OrdersEntity } from '../../orders/entities/orders.entity';
import { ProductsEntity } from '../../products/entities/products.entity';
import { UsersEntity } from './users.entity';

@Entity('users_cart')
export class UsersCartEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => UsersEntity, (user) => user.cart)
  user: UsersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.cart)
  product: ProductsEntity;

  @ManyToOne(() => OrdersEntity, (order) => order.cart)
  order: OrdersEntity;
}
