import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAtivoToAvisos1619203222240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'avisos',
            new TableColumn({
                name: 'ativo',
                type: 'boolean',
                default: 'true'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('avisos', 'ativo');
    }

}
