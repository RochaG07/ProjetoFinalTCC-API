import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdAdmToConsoles1601584077193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'consoles',
            new TableColumn({
                name: 'idAdm',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'consoles',
            new TableForeignKey({
                name: 'AdministradorConsoles',
                columnNames: ['idAdm'],
                referencedColumnNames: ['id'],
                referencedTableName: 'administradores',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('consoles', 'AdministradorConsoles');

        await queryRunner.dropColumn('consoles', 'idAdm');
    }

}
