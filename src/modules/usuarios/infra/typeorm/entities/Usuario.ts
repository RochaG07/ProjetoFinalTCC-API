import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('usuarios')
class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    senha: string;

    @Column()
    avatar: string;

    @Column()
    nome: string;

    @Column({nullable: true})
    telefone?: string;
    
    @Column()
    municipio: string;

    @Column()
    estado: string;

    @Column()
    ativo: boolean;

    @Column()
    trocasDisponiveis: number;

    @Column()
    possuiStatusDeAdm: boolean;

    @CreateDateColumn()
    proxTrocaDisp: Date | null;

    @CreateDateColumn()
    dataCriacao: Date;

    @UpdateDateColumn()
    dataAlteracao: Date;

    @Expose({ name: 'avatar_url' })
    getAvatar_url(): string | null {
        if (!this.avatar){
            return null;
        }

        switch(uploadConfig.driver){
            case 'disk':
                return `${process.env.APP_API_URL}/avatares/${this.avatar}`;
            case 's3':
                return `$https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/avatares/${this.avatar}`;
            default:
                return null;
        }
    }    
}

export default Usuario;