import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddIdConsoleToJogosConsoles1598839871757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'jogos_consoles',
            new TableColumn({
                name: 'idConsole',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'jogos_consoles',
            new TableForeignKey({
                name: 'Jogos_consolesConsoles',
                columnNames: ['idConsole'],
                referencedColumnNames: ['id'],
                referencedTableName: 'consoles',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jogos_consoles', 'Jogos_consolesConsoles');

        await queryRunner.dropColumn('jogos_consoles', 'idConsole');
    }

}
