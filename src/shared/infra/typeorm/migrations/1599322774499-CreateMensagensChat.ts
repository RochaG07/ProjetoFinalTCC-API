import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMensagensChat1599322774499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'mensagenschat',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'conteudo',
                        type: 'varchar'
                    },
                    {
                        name:'dataEnvio',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('mensagenschat');
    }

}
