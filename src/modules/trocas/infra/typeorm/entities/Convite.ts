import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Troca from '@modules/trocas/infra/typeorm/entities/Troca';

@Entity('convites')
class Convite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    mensagem: string;

    @Column()
    foiAceito: boolean;

    @CreateDateColumn()
    dataEnvio: Date;

    @CreateDateColumn()
    dataResposta: Date;
    
    @Column()
    nome_solicitador: string;

    @Column()
    idUser_solicitador: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser_solicitador'})
    usuario: Usuario

    @Column()
    idTroca: string;
    @ManyToOne(() => Troca)
    @JoinColumn({name: 'idTroca'})
    troca: Troca
}

export default Convite;