import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdUserToTokenUsuarios1599586837915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tokenusuarios',
            new TableColumn({
                name: 'idUser',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'tokenusuarios',
            new TableForeignKey({
                name: 'TokenUsuariosUsuarios',
                columnNames: ['idUser'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tokenusuarios', 'TokenUsuariosUsuarios');

        await queryRunner.dropColumn('tokenusuarios', 'idUser');
    }

}
