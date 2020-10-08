import { Entity, Column,PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

import Negociacao from './Negociacao';

@Entity('mensagenschat')
class MensagemChat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    conteudo: string;
    
    @CreateDateColumn()
    dataEnvio: Date;

    @Column()
    idNeg: string;
    @ManyToOne(() => Negociacao)
    @JoinColumn({name: 'idNeg'})
    negociacao: Negociacao
}

export default MensagemChat;