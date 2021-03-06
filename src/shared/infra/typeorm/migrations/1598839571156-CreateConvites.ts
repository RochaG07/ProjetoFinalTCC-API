import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateConvites1598839571156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'convites',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name:'mensagem',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name:'nome_solicitador',
                        type: 'varchar',
                    },
                    {
                        name:'foiAceito',
                        type: 'boolean',
                        isNullable: true,

                    },
                    {
                        name:'dataEnvio',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name:'dataResposta',
                        type: 'timestamp',
                        isNullable: true,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('convites');
    }

}
