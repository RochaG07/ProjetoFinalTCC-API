import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdAdmToAvisos1598839741042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'avisos',
            new TableColumn({
                name: 'idAdm',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'avisos',
            new TableForeignKey({
                name: 'AdministradoresAvisos',
                columnNames: ['idAdm'],
                referencedColumnNames: ['id'],
                referencedTableName: 'administradores',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('avisos', 'AdministradoresAvisos');

        await queryRunner.dropColumn('avisos', 'idAdm');
    }

}
