import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('permissoes')
class Permissao {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @CreateDateColumn()
    dataCriacao: Date;
}

export default Permissao;