import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdUserToPagamentos1599164580052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'pagamentos',
            new TableColumn({
                name: 'idUser',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'pagamentos',
            new TableForeignKey({
                name: 'PagamentosUsuarios',
                columnNames: ['idUser'],
                referencedColumnNames: ['id'],
                referencedTableName: 'pagamentos',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pagamentos', 'PagamentosUsuarios');

        await queryRunner.dropColumn('pagamentos', 'idUser');
    }

}
