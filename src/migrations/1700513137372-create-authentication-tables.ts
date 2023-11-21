import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthenticationTables1700513137372
  implements MigrationInterface
{
  name = 'CreateAuthenticationTables1700513137372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    const users = [
      {
        username: 'gfring',
        password:
          '$2a$12$Ppq.I3NsfK5vIG3rdTSHsOJHhOQ6k.RY/XZkhT9QM3pVTao.fJHBO',
        isAdmin: true,
      },
      {
        username: 'wwhite',
        password:
          '$2a$12$CRzBUQ6H0v6OgPruknd0ROK8kl628GBKy54W7KTbpxev2N8METeve',
        isAdmin: false,
      },
      {
        username: 'jpinkman',
        password:
          '$2a$12$faEAZ4ltGWwVYAO2uouZ8ezjzEzKT3ZFOldKD9/916j3RNqOGv5c6',
        isAdmin: false,
      },
    ];

    for (const user of users) {
      await queryRunner.query(
        `INSERT INTO "users" ("username", "password", "isAdmin") VALUES ('${user.username}', '${user.password}', ${user.isAdmin})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
