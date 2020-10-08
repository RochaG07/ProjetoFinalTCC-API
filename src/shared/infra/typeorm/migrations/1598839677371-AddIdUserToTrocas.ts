import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdUserToTrocas1598839677371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'trocas',
            new TableColumn({
                name: 'idUser',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'trocas',
            new TableForeignKey({
                name: 'UsuariosTrocas',
                columnNames: ['idUser'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('trocas', 'UsuariosTrocas');

        await queryRunner.dropColumn('trocas', 'idUser');
    }

}
