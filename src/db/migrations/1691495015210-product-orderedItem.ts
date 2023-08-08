import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductOrderedItem1691495015210 implements MigrationInterface {
    name = 'ProductOrderedItem1691495015210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ordered_item" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "ordered_item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "ordered_item" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_item" ADD CONSTRAINT "FK_afa30c3c53758ff3ac324a88267" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ordered_item" DROP CONSTRAINT "FK_afa30c3c53758ff3ac324a88267"`);
        await queryRunner.query(`ALTER TABLE "ordered_item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "ordered_item" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_item" DROP COLUMN "productId"`);
    }

}
