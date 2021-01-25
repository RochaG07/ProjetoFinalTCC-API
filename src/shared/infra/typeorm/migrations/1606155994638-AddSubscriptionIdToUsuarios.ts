import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddSubscriptionIdToUsuarios1606155994638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios',
            new TableColumn({
                name: 'idSubscription',
                type: 'varchar',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuarios', 'idSubscription');
    }
}
