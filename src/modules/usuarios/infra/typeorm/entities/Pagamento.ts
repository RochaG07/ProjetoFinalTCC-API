import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

//ManyToOne com usuarios
@Entity('pagamentos')
class Pagamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    valorPago: number;

    @Column()
    desconto: number;

    @Column()
    metodoPagamento: string;

    @CreateDateColumn()
    dataRealizado: Date;

    @Column()
    idUser: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'idUser'})
    usuario: Usuario
}

export default Pagamento;