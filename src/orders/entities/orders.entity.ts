import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { OrdersDetailsEntity } from './orders.details.entity';

@Entity('orders')
export class OrdersEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: false })
  total: number;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;

  @OneToMany(() => OrdersDetailsEntity, (orderDetail) => orderDetail.order)
  ordersDetails: OrdersDetailsEntity[];
}
