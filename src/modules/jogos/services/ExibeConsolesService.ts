import { injectable, inject } from 'tsyringe';

import IConsolesRepository from '@modules/jogos/repositories/IConsolesRepository';

interface IConsoles{
    id: string,
    nome: string,
}

@injectable()
class ExibeConsolesService{
    constructor(
        @inject('ConsolesRepository')
        private consolesRepository: IConsolesRepository,
    ){}

    public async executar():Promise<IConsoles[]> {
        const consoles: IConsoles[] = await this.consolesRepository.getConsoles();

        return consoles;
    }
}

export default ExibeConsolesService;