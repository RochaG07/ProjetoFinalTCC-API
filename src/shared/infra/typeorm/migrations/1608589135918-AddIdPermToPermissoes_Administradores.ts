import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdPermToPermissoesAdministradores1608589135918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'permissoes_administradores',
            new TableColumn({
                name: 'idPerm',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'permissoes_administradores',
            new TableForeignKey({
                name: 'Permissoes_administradoresPermissoes',
                columnNames: ['idPerm'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissoes',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissoes_administradores', 'idPerm');

        await queryRunner.dropColumn('permissoes_administradores', 'Permissoes_administradoresPermissoes');
    }

}
