import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdPlanoToUsuariosPlanos1599323175775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios_planos',
            new TableColumn({
                name: 'idPlano',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'usuarios_planos',
            new TableForeignKey({
                name: 'PlanosUsuarios_planos',
                columnNames: ['idPlano'],
                referencedColumnNames: ['id'],
                referencedTableName: 'planos',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('usuarios_planos', 'PlanosUsuarios_planos');

        await queryRunner.dropColumn('usuarios_planos', 'idPlano');
    }

}
