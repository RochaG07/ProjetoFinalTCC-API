import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTrocas1598839577829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'trocas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'descricao',
                        type: 'varchar'
                    },
                    {
                        name:'ativo',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name:'dataCriacao',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('trocas');
    }

}
