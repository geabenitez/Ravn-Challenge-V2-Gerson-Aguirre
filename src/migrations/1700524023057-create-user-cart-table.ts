import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserCartTable1700524023057 implements MigrationInterface {
  name = 'CreateUserCartTable1700524023057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_cart" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "userId" uuid, "productId" uuid, CONSTRAINT "PK_cbfb19ddc0218b26522f9fea2eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cart" ADD CONSTRAINT "FK_dc0fe69b19b5867f0532984d9d6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cart" ADD CONSTRAINT "FK_88399a694b97450b42277158b46" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_cart" DROP CONSTRAINT "FK_88399a694b97450b42277158b46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cart" DROP CONSTRAINT "FK_dc0fe69b19b5867f0532984d9d6"`,
    );
    await queryRunner.query(`DROP TABLE "users_cart"`);
  }
}
