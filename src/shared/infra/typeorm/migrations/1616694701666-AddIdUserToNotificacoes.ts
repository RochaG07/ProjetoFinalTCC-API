import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddIdUserToNotificacoes1616694701666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'notificacoes',
            new TableColumn({
                name: 'idUser',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'notificacoes',
            new TableForeignKey({
                name: 'NotificacoesUsuarios',
                columnNames: ['idUser'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'SET NULL',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('notificacoes', 'NotificacoesUsuarios');

        await queryRunner.dropColumn('notificacoes', 'idUser');
    }

}
