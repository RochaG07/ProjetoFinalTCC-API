import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';

@Entity('consoles')
class Console {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    idAdm: string;
    @ManyToOne(() => Administrador)
    @JoinColumn({name: 'idAdm'})
    administrador: Administrador
}

export default Console;