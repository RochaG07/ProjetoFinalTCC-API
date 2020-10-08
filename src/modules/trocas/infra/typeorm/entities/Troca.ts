import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

@Entity('trocas')
class Troca {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @Column()
    ativo: boolean;
    
    @CreateDateColumn()
    dataCriacao: Date;

    @Column()
    idUser: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario
}

export default Troca;