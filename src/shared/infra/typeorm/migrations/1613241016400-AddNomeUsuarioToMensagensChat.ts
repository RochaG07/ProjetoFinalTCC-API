import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNomeUsuarioToMensagensChat1613241016400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'mensagenschat',
            new TableColumn({
                name: 'nomeusuario',
                type: 'varchar',
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('mensagenschat', 'nomeusuario');

    }

}
