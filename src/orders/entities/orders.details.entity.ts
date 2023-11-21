import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { ProductsEntity } from '../../products/entities/products.entity';
import { OrdersEntity } from './orders.entity';

@Entity('orders_details')
export class OrdersDetailsEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrdersEntity, (order) => order.ordersDetails)
  order: OrdersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.ordersDetails)
  product: ProductsEntity;
}
