import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNegociacoes1598839603534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'negociacoes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
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
        await queryRunner.dropTable('negociacoes');
    }

}
