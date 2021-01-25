import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

@Entity('administradores')
class Administrador {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ativo: boolean;

    @Column()
    idUser: string;
    @OneToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario
}

export default Administrador;