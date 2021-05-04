import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import IJogosConsolesRepository from '@modules/jogos/repositories/IJogosConsolesRepository';

interface IRequest {
    idJogo: string,
}

@injectable()
class DeletaJogoService{
    constructor(
        @inject('JogosRepository')
        private jogosRepository: IJogosRepository,
        @inject('JogosConsolesRepository')
        private jogosConsolesRepository: IJogosConsolesRepository,
    ){}

    public async executar({idJogo}: IRequest):Promise<void> {
     
        const jogo = await this.jogosRepository.acharPorId(idJogo);

        if (!jogo){
            throw new AppError('Jogo não existe', 404);
        }

        await this.jogosConsolesRepository.deletarPorIdJogo(idJogo);

        await this.jogosRepository.deletarPorId(idJogo);
    }
}

export default DeletaJogoService;