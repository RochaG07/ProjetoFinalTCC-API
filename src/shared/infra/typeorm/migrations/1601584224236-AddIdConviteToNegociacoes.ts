import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdConviteToNegociacoes1601584224236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'negociacoes',
            new TableColumn({
                name: 'idConvite',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'negociacoes',
            new TableForeignKey({
                name: 'ConvitesNegociacoes',
                columnNames: ['idConvite'],
                referencedColumnNames: ['id'],
                referencedTableName: 'convites',
                onDelete: 'SET NULL', 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('negociacoes', 'ConvitesNegociacoes');

        await queryRunner.dropColumn('negociacoes', 'idConvite');
    }

}
