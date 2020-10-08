import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, ManyToOne, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

@Entity('tokenusuarios')
class TokenUsuario{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    idUser: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario

    @CreateDateColumn()
    dataCriacao: Date;
}

export default TokenUsuario;