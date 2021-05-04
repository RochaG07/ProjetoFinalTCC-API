import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IConsolesRepository from '@modules/jogos/repositories/IConsolesRepository';
import IJogosConsolesRepository from '@modules/jogos/repositories/IJogosConsolesRepository';

interface IRequest {
    idConsole: string,
}

@injectable()
class DeletaConsoleService{
    constructor(
        @inject('ConsolesRepository')
        private consolesRepository: IConsolesRepository,
        @inject('JogosConsolesRepository')
        private jogosConsolesRepository: IJogosConsolesRepository,
    ){}

    public async executar({idConsole}: IRequest):Promise<void> {
        const console = await this.consolesRepository.acharPorId(idConsole);

        if (!console){
            throw new AppError('Console não existe', 404);
        }

        await this.jogosConsolesRepository.deletarPorIdConsole(idConsole);

        await this.consolesRepository.deletarPorId(idConsole);
    }
}

export default DeletaConsoleService;