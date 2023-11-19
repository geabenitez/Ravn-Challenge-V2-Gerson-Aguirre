import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { ProductsEntity } from '../../products/entities/products.entity';

@Entity('categories')
export class CategoriesEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 600, nullable: false })
  description: string;

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}
