import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

@Entity('premium')
class Premium {
    @PrimaryGeneratedColumn('uuid')
    id: string;
        
    @Column()
    status: string;
    
    @Column({nullable: true})
    idCustomer?: string;

    @Column({nullable: true})
    idSubscription?: string;

    @CreateDateColumn({nullable: true})
    dataExpiracao?: Date;

    @Column()
    idUser: string;
    @OneToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario
}

export default Premium;