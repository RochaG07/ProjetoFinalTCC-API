import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdJogoToTrocasJogos1598839844008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'trocas_jogos',
            new TableColumn({
                name: 'idJogo',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'trocas_jogos',
            new TableForeignKey({
                name: 'Trocas_jogosJogos',
                columnNames: ['idJogo'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jogos',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('trocas_jogos', 'Trocas_jogosJogos');

        await queryRunner.dropColumn('trocas_jogos', 'idJogo');
    }

}
