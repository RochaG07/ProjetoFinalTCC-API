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

    public async transformaIdConsoleEmNome(idConsole: string): Promise<string | undefined>{
        const console = await this.ormRepository.findOne({
            where:{id: idConsole}
        });
        
        if(console){
            return console.nome;
        } else {
            return undefined;
        }
    }

    public async getConsoles(): Promise<Console[]>{
        const consoles = await this.ormRepository.find();

        return consoles;
    }
}

export default ConsolesRepository;