import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdministradores1598839554862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'administradores',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name:'nivelAcesso',
                        type: 'int',
                        default: 1,
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
                    {
                        name:'dataAlteracao',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('administradores');
    }

}
