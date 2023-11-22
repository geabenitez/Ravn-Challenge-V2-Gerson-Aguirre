import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductDetailsTable1700582642695
  implements MigrationInterface
{
  name = 'UpdateProductDetailsTable1700582642695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders_details" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "orders_details" ADD "unitPrice" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_details" ADD "totalPrice" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_details" DROP COLUMN "totalPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_details" DROP COLUMN "unitPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_details" ADD "price" double precision NOT NULL`,
    );
  }
}
