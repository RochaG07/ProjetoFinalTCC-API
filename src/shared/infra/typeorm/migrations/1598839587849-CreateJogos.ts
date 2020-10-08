import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateJogos1598839587849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'jogos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name:'nome',
                        type: 'varchar'
                    },
                    {
                        name: 'capa',
                        type: 'varchar',
                        isNullable: true,
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('jogos');
    }

}
