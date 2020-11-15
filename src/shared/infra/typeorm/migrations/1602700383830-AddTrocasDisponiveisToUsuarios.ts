import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTrocasDisponiveisToUsuarios1602700383830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios',
            new TableColumn({
                name: 'trocasDisponiveis',
                type: 'integer',
                default: 3,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('trocasDisponiveis', 'idCustomer');
    }

}
