import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddEstadoEMunicipioToTrocas1611600377567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'trocas',
            new TableColumn({
                name: 'estado',
                type: 'varchar',
            })
        );

        await queryRunner.addColumn(
            'trocas',
            new TableColumn({
                name: 'municipio',
                type: 'varchar',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('trocas', 'estado');
        await queryRunner.dropColumn('trocas', 'municipio');
    }

}
