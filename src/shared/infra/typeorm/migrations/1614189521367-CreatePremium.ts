import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePremium1614189521367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'premium',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        default: 'nao-iniciado',
                    },
                    {
                        name: 'idCustomer',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'idSubcription',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name:'dataExpiracao',
                        type: 'timestamp',
                        isNullable: true,
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('premium');
    }
}
