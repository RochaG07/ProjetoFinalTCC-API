import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdUserToPremium1614190136430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'premium',
            new TableColumn({
                name: 'idUser',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'premium',
            new TableForeignKey({
                name: 'PremiumUsuarios',
                columnNames: ['idUser'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'SET NULL',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('premium', 'PremiumUsuarios');

        await queryRunner.dropColumn('premium', 'idUser');
    }
}
