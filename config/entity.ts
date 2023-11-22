import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CustomEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: string;
}
