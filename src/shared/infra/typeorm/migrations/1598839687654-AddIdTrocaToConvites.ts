import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdTrocaToConvites1598839687654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'convites',
            new TableColumn({
                name: 'idTroca',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'convites',
            new TableForeignKey({
                name: 'TrocasConvites',
                columnNames: ['idTroca'],
                referencedColumnNames: ['id'],
                referencedTableName: 'trocas',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('convites', 'TrocasConvites');

        await queryRunner.dropColumn('convites', 'idTroca');
    }

}
