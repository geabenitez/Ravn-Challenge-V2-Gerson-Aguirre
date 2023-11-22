import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCartTable1700539190921 implements MigrationInterface {
  name = 'UpdateCartTable1700539190921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users_cart" ADD "orderId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users_cart" ADD CONSTRAINT "FK_868b1ac2758b71a0ddd9f70e6a8" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_cart" DROP CONSTRAINT "FK_868b1ac2758b71a0ddd9f70e6a8"`,
    );
    await queryRunner.query(`ALTER TABLE "users_cart" DROP COLUMN "orderId"`);
  }
}
