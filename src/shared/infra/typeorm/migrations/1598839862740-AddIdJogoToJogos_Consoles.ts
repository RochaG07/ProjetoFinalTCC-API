import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdJogoToJogosConsoles1598839862740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'jogos_consoles',
            new TableColumn({
                name: 'idJogo',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'jogos_consoles',
            new TableForeignKey({
                name: 'Jogos_consolesJogos',
                columnNames: ['idJogo'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jogos',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jogos_consoles', 'Jogos_consolesJogos');

        await queryRunner.dropColumn('jogos_consoles', 'idJogo');
    }

}
