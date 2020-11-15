import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Administrador from '@modules/administradores/infra/typeorm/entities/Administrador';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';

@Entity('jogos')
class Jogo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;
    
    @Column()
    capa: string;

    @Column()
    idAdm: string;
    @ManyToOne(() => Administrador)
    @JoinColumn({name: 'idAdm'})
    administrador: Administrador

    @Expose({ name: 'capa_url' })
    getCapa_url(): string {
        switch(uploadConfig.driver){
            case 'disk':
                return `${process.env.APP_API_URL}/capas/${this.capa}`;
            case 's3':
                return `$https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.capa}`;
        }
    }
}

export default Jogo;
