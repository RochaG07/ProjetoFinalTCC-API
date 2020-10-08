import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdAdmToJogos1599323055776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'jogos',
            new TableColumn({
                name: 'idAdm',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'jogos',
            new TableForeignKey({
                name: 'AdministradorJogos',
                columnNames: ['idAdm'],
                referencedColumnNames: ['id'],
                referencedTableName: 'administradores',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jogos', 'AdministradorJogos');

        await queryRunner.dropColumn('jogos', 'idAdm');
    }

}
