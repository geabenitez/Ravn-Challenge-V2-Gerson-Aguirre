import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImagesTable1700434688745 implements MigrationInterface {
  name = 'CreateImagesTable1700434688745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products_images" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_12730b169c59b35f40ccdf36fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imageUrl"`);
    await queryRunner.query(
      `ALTER TABLE "products_images" ADD CONSTRAINT "FK_7378beebe3320f7e6fe5bb3145f" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_images" DROP CONSTRAINT "FK_7378beebe3320f7e6fe5bb3145f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "imageUrl" character varying`,
    );
    await queryRunner.query(`DROP TABLE "products_images"`);
  }
}
