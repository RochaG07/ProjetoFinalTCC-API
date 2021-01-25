import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdAdmToPermissoesAdministradores1608589126001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'permissoes_administradores',
            new TableColumn({
                name: 'idAdm',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'permissoes_administradores',
            new TableForeignKey({
                name: 'Permissoes_administradoresAdministradores',
                columnNames: ['idAdm'],
                referencedColumnNames: ['id'],
                referencedTableName: 'administradores',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissoes_administradores', 'idAdm');

        await queryRunner.dropColumn('permissoes_administradores', 'Permissoes_administradoresAdministradores');
    }

}
