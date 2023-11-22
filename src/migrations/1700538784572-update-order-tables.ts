import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderTables1700538784572 implements MigrationInterface {
  name = 'UpdateOrderTables1700538784572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_details" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_details" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders_details" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "orders_details" DROP COLUMN "quantity"`,
    );
  }
}
