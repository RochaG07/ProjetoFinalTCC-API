import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

@Entity('avisos')
class Aviso {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    conteudo: string;

    @CreateDateColumn()
    dataEnvio: Date;

    @Column()
    idAdm: string;
    @ManyToOne(() => Administrador)
    @JoinColumn({name: 'idAdm'})
    administrador: Administrador

    @Column()
    idUser: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario
}

export default Aviso;