import { Entity, Column,PrimaryGeneratedColumn , ManyToOne, JoinColumn} from 'typeorm';

import Jogo from '@modules/jogos/infra/typeorm/entities/Jogo';
import Troca from './Troca';

@Entity('trocas_jogos')
class TrocaJogo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idJogo: string;
    @ManyToOne(() => Jogo)
    @JoinColumn({name: 'idJogo'})
    jogo: Jogo

    @Column()
    idTroca: string;
    @ManyToOne(() => Troca)
    @JoinColumn({name: 'idTroca'})
    troca: Troca
}

export default TrocaJogo;
