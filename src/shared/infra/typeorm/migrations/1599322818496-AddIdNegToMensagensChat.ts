import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdNegToMensagensChat1599322818496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'mensagenschat',
            new TableColumn({
                name: 'idNeg',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'mensagenschat',
            new TableForeignKey({
                name: 'NegociacoesMensagenschat',
                columnNames: ['idNeg'],
                referencedColumnNames: ['id'],
                referencedTableName: 'negociacoes',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('mensagenschat', 'NegociacoesMensagenschat');

        await queryRunner.dropColumn('mensagenschat', 'idNeg');
    }

}
