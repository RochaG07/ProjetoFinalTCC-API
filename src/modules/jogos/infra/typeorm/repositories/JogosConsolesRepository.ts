import { getRepository, Repository} from 'typeorm';

import IJogosConsolesRepository from '../../../repositories/IJogosConsolesRepository';
import ICriarJogoConsoleDTO from '@modules/jogos/dtos/ICriarJogoConsoleDTO';

import JogoConsole from '../entities/JogoConsole';

class JogosConsolesRepository implements IJogosConsolesRepository {
    private ormRepository: Repository<JogoConsole>;

    constructor(){
        this.ormRepository= getRepository(JogoConsole);
    }

    public async criar(data: ICriarJogoConsoleDTO): Promise<JogoConsole>{
        const jogoConsole = this.ormRepository.create(data);

        await this.ormRepository.save(jogoConsole);

        return jogoConsole;
    };

}

export default JogosConsolesRepository;