import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsuarios1598839537645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name:'username',
                        type: 'varchar'
                    },
                    {
                        name:'email',
                        type: 'varchar'
                    },
                    {
                        name:'senha',
                        type: 'varchar'
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name:'municipio',
                        type: 'varchar'
                    },
                    {
                        name:'estado',
                        type: 'varchar'
                    },
                    {
                        name:'ativo',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name:'possuiStatusDeAdm',
                        type: 'boolean',
                        default: false,
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
        await queryRunner.dropTable('usuarios');
    }

}
