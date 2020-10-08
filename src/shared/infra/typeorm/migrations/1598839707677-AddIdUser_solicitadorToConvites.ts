import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdUserSolicitadorToConvites1598839707677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'convites',
            new TableColumn({
                name: 'idUser_solicitador',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'convites',
            new TableForeignKey({
                name: 'User_solicitadorConvites',
                columnNames: ['idUser_solicitador'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'SET NULL', 
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('convites', 'User_solicitadorConvites');

        await queryRunner.dropColumn('convites', 'idUser_solicitador');
    }

}
