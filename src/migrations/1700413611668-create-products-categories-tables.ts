import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsCategoriesTables1700413611668
  implements MigrationInterface
{
  name = 'CreateProductsCategoriesTables1700413611668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(600) NOT NULL, "price" double precision NOT NULL, "quantity" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "imageUrl" character varying, "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(600) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    const categories = [
      {
        id: 'f2f2af46-3075-4080-903c-94b83786a21f',
        name: 'Fresh Chicken',
        description: 'All-natural, fresh chicken perfect for any meal.',
      },
      {
        id: '58e90ec2-4772-40a9-93ea-b967bb6a7a7d',
        name: 'Frozen Chicken',
        description: 'Conveniently packaged and frozen to lock in flavor.',
      },
      {
        id: '3cca7241-cfb1-464a-a548-a2569722ab2c',
        name: 'Organic Chicken',
        description: 'Certified organic chicken raised without hormones.',
      },
      {
        id: 'b459aea1-3445-47d9-9a6a-a38030bd67cc',
        name: 'Grilled Chicken',
        description: 'Pre-grilled chicken for quick and easy meals.',
      },
      {
        id: 'c07b87ab-d3e7-48cd-824d-82ba5306725c',
        name: 'Marinated Chicken',
        description: 'Chicken marinated in savory spices and ready to cook.',
      },
    ];

    const products = [
      {
        name: 'Los Pollos Signature Grill',
        description:
          'A succulent grilled chicken, marinated with Los Pollos Hermanos secret blend of spices, cooked to perfection by the standards of Gustavo Fring himself.',
        price: 15.99,
        quantity: 20,
        category: 'b459aea1-3445-47d9-9a6a-a38030bd67cc',
      },
      {
        name: 'Hermanos Spicy Wings',
        description:
          'Spicy chicken wings that pack a punch, infused with a fiery sauce thats been crafted to deliver a bold taste, courtesy of the meticulous Gustavo Fring.',
        price: 12.99,
        quantity: 15,
        category: 'c07b87ab-d3e7-48cd-824d-82ba5306725c',
      },
      {
        name: 'Blue Sky Tenders',
        description:
          'Tender strips of chicken coated in a uniquely blue crispy breading, inspired by the unmistakable color of Heisenberg product. A delicious treat that keeps customers coming back for more.',
        price: 9.99,
        quantity: 50,
        category: '3cca7241-cfb1-464a-a548-a2569722ab2c',
      },
      {
        name: 'Frings Family Feast',
        description:
          'An ample serving of our finest chicken pieces, including thighs, wings, and breasts, all seasoned with a secret blend of spices that Gustavo Fring himself would serve to his guests. Perfect for family dinners.',
        price: 29.99,
        quantity: 5,
        category: '3cca7241-cfb1-464a-a548-a2569722ab2c',
      },
    ];

    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO "categories" ("id", "name", "description") VALUES ('${category.id}', '${category.name}', '${category.description}')`,
      );
    }

    for (const product of products) {
      await queryRunner.query(
        `INSERT INTO "products" ("name", "description", "price", "quantity", "categoryId") VALUES ('${product.name}', '${product.description}', ${product.price}, ${product.quantity}, '${product.category}')`,
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
