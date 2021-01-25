import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddProxTrocaDispToUsuarios1606327012049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios',
            new TableColumn({
                name: 'proxTrocaDisp',
                type: 'timestamp',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuarios', 'proxTrocaDisp');
    }
}
