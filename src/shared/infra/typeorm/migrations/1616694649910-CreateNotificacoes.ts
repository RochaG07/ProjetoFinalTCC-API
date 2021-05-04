import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNotificacoes1616694649910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'notificacoes',
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
                        type: 'varchar',
                    },
                    {
                        name:'datacriacao',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notificacoes');
    }
}
