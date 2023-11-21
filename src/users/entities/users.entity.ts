import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { OrdersEntity } from '../../orders/entities/orders.entity';
import { UsersCartEntity } from './users.cart.entity';

@Entity('users')
export class UsersEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];

  @OneToMany(() => UsersCartEntity, (cart) => cart.user)
  cart: UsersCartEntity[];
}
