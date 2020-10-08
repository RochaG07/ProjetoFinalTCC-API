import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePlanos1599164526696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'planos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'valorMensal',
                        type: 'decimal',
                        precision: 10,
                        scale: 2
                    },
                    {
                        name:'possuiExpiracao',
                        type: 'boolean',
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('planos');
    }

}
