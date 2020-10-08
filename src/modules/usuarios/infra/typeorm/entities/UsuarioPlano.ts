import { Entity, Column, OneToOne,PrimaryGeneratedColumn , CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import Usuario from './Usuario';
import Plano from './Plano';

//Relacionamentos OneToOne com usuarios, ManyToOne com planos
@Entity('usuarios_planos')
class UsuarioPlano {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    dataExpiracao: Date;

    @CreateDateColumn()
    dataInicio: Date;

    @Column()
    idUser: string;
    @OneToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario

    @Column()
    idPlano: string;
    @ManyToOne(() => Plano)
    @JoinColumn({name: 'idPlano'})
    plano: Plano

}

export default UsuarioPlano;