import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomEntity } from '../../../config/entity';
import { ProductsEntity } from './products.entity';

@Entity('products_images')
export class ProductsImagesEntity extends CustomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  imageUrl: string;

  @ManyToOne(() => ProductsEntity, (product) => product.images)
  product: ProductsEntity;
}
