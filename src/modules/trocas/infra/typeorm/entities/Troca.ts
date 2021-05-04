import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import uploadConfig from '@config/upload';

import { Expose } from 'class-transformer';

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
    capaJogoOfertado: string;

    @Column()
    capaJogoDesejado: string;

    @Column()
    nomeConsoleJogoOfertado: string;

    @Column()
    nomeConsoleJogoDesejado: string;

    @Column()
    estado: string;

    @Column()
    municipio: string;

    @Column()
    username: string;
    
    @CreateDateColumn()
    dataCriacao: Date;

    @Column()
    idUser: string;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario

    @Expose({ name: 'urlDaCapaJogoOfertado'})
    getUrlDaCapaJogoOfertado(): string | null {
        if (!this.capaJogoOfertado){
            return null;
        }

        switch(uploadConfig.driver){
            case 'disk':
                return `${process.env.APP_API_URL}/capas/${this.capaJogoOfertado}`;
            case 's3':
                return `$https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/capas/${this.capaJogoOfertado}`;
            default:
                return null;
        }
    }    
    
    @Expose({ name: 'urlDaCapaJogoDesejado' })
    getUrlDaCapaJogoDesejado(): string | null {
        if (!this.capaJogoDesejado){
            return null;
        }

        switch(uploadConfig.driver){
            case 'disk':
                return `${process.env.APP_API_URL}/capas/${this.capaJogoDesejado}`;
            case 's3':
                return `$https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/capas/${this.capaJogoDesejado}`;
            default:
                return null;
        }
    }   
}

export default Troca;