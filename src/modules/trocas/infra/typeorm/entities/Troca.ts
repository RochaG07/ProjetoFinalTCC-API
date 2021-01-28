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

    @Column()
    nomeJogoOfertado: string;

    @Column()
    nomeJogoDesejado: string;

    @Column()
    urlDaCapaJogoOfertado: string;

    @Column()
    urlDaCapaJogoDesejado: string;

    @Column()
    nomeConsoleJogoOfertado: string;

    @Column()
    nomeConsoleJogoDesejado: string;

    @Column()
    estado: string;

    @Column()
    municipio: string;
    
    @CreateDateColumn()
    dataCriacao: Date;

    @Column()
    idUser: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario
}

export default Troca;