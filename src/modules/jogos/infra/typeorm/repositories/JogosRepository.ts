import { getRepository, Repository} from 'typeorm';

import IJogosRepository from '../../../repositories/IJogosRepository';
import ICriarJogoDTO from '@modules/jogos/dtos/ICriarJogoDTO';

import Jogo from '../entities/Jogo';

class JogosRepository implements IJogosRepository {
    private ormRepository: Repository<Jogo>;

    constructor(){
        this.ormRepository= getRepository(Jogo);
    }

    public async criar(data: ICriarJogoDTO): Promise<Jogo>{
        const jogo = this.ormRepository.create(data);

        await this.ormRepository.save(jogo);

        return jogo;
    }
    
    public async acharPorNome(nome: string): Promise<Jogo | undefined>{
        const jogo = await this.ormRepository.findOne({
            where:{nome}
        });

        return jogo;
    }

    public async acharPorId(id: string): Promise<Jogo | undefined>{
        const jogo = await this.ormRepository.findOne({
            where:{id}
        });

        return jogo;
    }

    public async getJogos(): Promise<Jogo[]>{
        const jogos = await this.ormRepository.find();

        return jogos;
    }
}

export default JogosRepository;