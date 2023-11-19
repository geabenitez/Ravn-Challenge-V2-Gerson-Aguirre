import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';

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

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  category: CategoriesEntity;
}
