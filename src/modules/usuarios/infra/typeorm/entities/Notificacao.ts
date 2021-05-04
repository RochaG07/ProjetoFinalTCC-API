import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

@Entity('notificacoes')
class Notificacao{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    conteudo: string;

    @Column()
    idUser: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario

    @CreateDateColumn()
    dataCriacao: Date;
}

export default Notificacao;