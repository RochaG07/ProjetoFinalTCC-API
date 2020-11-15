import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCustomerIdToUsuarios1602697550050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios',
            new TableColumn({
                name: 'idCustomer',
                type: 'varchar',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuarios', 'idCustomer');
    }

}
