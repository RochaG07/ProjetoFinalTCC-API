import { getRepository, Repository} from 'typeorm';

import IConsolesRepository from '../../../repositories/IConsolesRepository';
import ICriarConsoleDTO from '@modules/jogos/dtos/ICriarConsoleDTO';

import Console from '../entities/Console';

class ConsolesRepository implements IConsolesRepository {
    private ormRepository: Repository<Console>;

    constructor(){
        this.ormRepository= getRepository(Console);
    }

    public async criar(data: ICriarConsoleDTO): Promise<Console>{
        const console = this.ormRepository.create(data);

        await this.ormRepository.save(console);

        return console;
    }

    public async acharPorNome(nome: string): Promise<Console | undefined>{
        const console = await this.ormRepository.findOne({
            where:{nome}
        });

        return console;
    }
}

export default ConsolesRepository;