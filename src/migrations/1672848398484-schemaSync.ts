import { MigrationInterface, QueryRunner } from "typeorm";

export class schemaSync1672848398484 implements MigrationInterface {
    name = 'schemaSync1672848398484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    }

}
