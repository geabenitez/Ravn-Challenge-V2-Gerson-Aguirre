import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { OrdersDetailsEntity } from '../../orders/entities/orders.details.entity';
import { UsersCartEntity } from '../../users/entities/users.cart.entity';
import { ProductsImagesEntity } from './products.images.entity';

@Entity('products')
export class ProductsEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 600, nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  category: CategoriesEntity;

  @OneToMany(() => ProductsImagesEntity, (image) => image.product)
  images: ProductsImagesEntity[];

  @OneToMany(() => OrdersDetailsEntity, (orderDetail) => orderDetail.product)
  ordersDetails: OrdersDetailsEntity[];

  @OneToMany(() => UsersCartEntity, (cart) => cart.product)
  cart: UsersCartEntity[];
}
