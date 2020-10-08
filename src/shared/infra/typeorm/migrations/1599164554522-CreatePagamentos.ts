import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePagamentos1599164554522 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pagamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'valorPago',
                        type: 'decimal',
                        precision: 10,
                        scale: 2
                    },
                    {
                        name: 'desconto',
                        type: 'decimal',
                        precision: 10,
                        scale: 2
                    },
                    {
                        name: 'metodoPagamento',
                        type: 'varchar',
                    },
                    {
                        name:'dataRealizado',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pagamentos');
    }
}
