import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import Jogo from './Jogo';
import Console from './Console';

@Entity('jogos_consoles')
class JogoConsole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idJogo: string;
    @ManyToOne(() => Jogo)
    @JoinColumn({name: 'idJogo'})
    jogo: Jogo

    @Column()
    idConsole: string;
    @ManyToOne(() => Console)
    @JoinColumn({name: 'idConsole'})
    console: Console
}

export default JogoConsole;
