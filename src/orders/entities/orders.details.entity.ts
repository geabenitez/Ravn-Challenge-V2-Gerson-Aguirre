import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { ProductsEntity } from '../../products/entities/products.entity';
import { OrdersEntity } from './orders.entity';

@Entity('orders_details')
export class OrdersDetailsEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ type: 'float', nullable: false })
  unitPrice: number;

  @Column({ type: 'float', nullable: false })
  totalPrice: number;

  @ManyToOne(() => OrdersEntity, (order) => order.ordersDetails)
  order: OrdersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.ordersDetails)
  product: ProductsEntity;
}
