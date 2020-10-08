import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsuariosPlanos1599323070597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios_planos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name:'dataInicio',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name:'dataExpiracao',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ]
            })
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios_planos');
    }

}

