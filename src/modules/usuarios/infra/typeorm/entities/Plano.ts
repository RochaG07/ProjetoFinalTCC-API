import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('planos')
class Plano {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    valorMensal: string;

    @Column()
    possuiExpiracao: boolean;
}

export default Plano;