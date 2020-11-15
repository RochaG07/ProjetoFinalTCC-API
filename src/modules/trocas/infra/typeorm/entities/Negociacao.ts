import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne} from 'typeorm';

import Convite from './Convite';

@Entity('negociacoes')
class Negociacao {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ativo: boolean;
    
    @CreateDateColumn()
    dataCriacao: Date;

    @Column()
    idConvite: string;
    @OneToOne(() => Convite)
    @JoinColumn({name: 'idConvite'})
    convite: Convite

}

export default Negociacao;