import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderOrdereditem1691488802709 implements MigrationInterface {
    name = 'OrderOrdereditem1691488802709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ordered_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "price" character varying NOT NULL, "orderId" uuid, CONSTRAINT "PK_5e6bd38fc51977db42e61d63a18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ordered_item" ADD CONSTRAINT "FK_d5144196f9ef94620707f9c11f1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ordered_item" DROP CONSTRAINT "FK_d5144196f9ef94620707f9c11f1"`);
        await queryRunner.query(`DROP TABLE "ordered_item"`);
    }

}
