import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Administrador from './Administrador';
import Permissao from './Permissao';

@Entity('permissoes_administradores')
class PermissaoAdministrador {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    idPerm: string;
    @ManyToOne(() => Permissao)
    @JoinColumn({name: 'idPerm'})
    permissao: Permissao

    @Column()
    idAdm: string;
    @ManyToOne(() => Administrador)
    @JoinColumn({name: 'idAdm'})
    administrador: Administrador
}

export default PermissaoAdministrador;