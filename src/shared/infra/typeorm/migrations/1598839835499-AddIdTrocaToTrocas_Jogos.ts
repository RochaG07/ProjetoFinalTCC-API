import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdTrocaToTrocasJogos1598839835499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'trocas_jogos',
            new TableColumn({
                name: 'idTroca',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'trocas_jogos',
            new TableForeignKey({
                name: 'Trocas_jogosTrocas',
                columnNames: ['idTroca'],
                referencedColumnNames: ['id'],
                referencedTableName: 'trocas',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('trocas_jogos', 'idTroca');

        await queryRunner.dropColumn('trocas_jogos', 'Trocas_jogosTrocas');
    }

}
