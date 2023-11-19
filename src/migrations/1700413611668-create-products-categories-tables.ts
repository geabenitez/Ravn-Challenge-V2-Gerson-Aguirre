import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsCategoriesTables1700413611668
  implements MigrationInterface
{
  name = 'CreateProductsCategoriesTables1700413611668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(600) NOT NULL, "price" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "imageUrl" character varying, "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(600) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    const categories = [
      {
        name: 'Fresh Chicken',
        description: 'All-natural, fresh chicken perfect for any meal.',
      },
      {
        name: 'Frozen Chicken',
        description: 'Conveniently packaged and frozen to lock in flavor.',
      },
      {
        name: 'Organic Chicken',
        description: 'Certified organic chicken raised without hormones.',
      },
      {
        name: 'Grilled Chicken',
        description: 'Pre-grilled chicken for quick and easy meals.',
      },
      {
        name: 'Marinated Chicken',
        description: 'Chicken marinated in savory spices and ready to cook.',
      },
    ];

    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO "categories" ("name", "description") VALUES ('${category.name}', '${category.description}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
