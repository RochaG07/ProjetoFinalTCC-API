import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdUserToUsuariosPlanos1599323167976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios_planos',
            new TableColumn({
                name: 'idUser',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'usuarios_planos',
            new TableForeignKey({
                name: 'UsuariosUsuarios_planos',
                columnNames: ['idUser'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('usuarios_planos', 'UsuariosUsuarios_planos');

        await queryRunner.dropColumn('usuarios_planos', 'idUser');
    }

}
