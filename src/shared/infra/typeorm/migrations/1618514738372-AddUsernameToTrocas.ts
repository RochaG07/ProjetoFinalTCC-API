import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUsernameToTrocas1618514738372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'trocas',
            new TableColumn({
                name: 'username',
                type: 'varchar',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('trocas', 'username');
    }

}
