import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Jogo from '@modules/jogos/infra/typeorm/entities/Jogo';

import IConsolesRepository from '@modules/jogos/repositories/IConsolesRepository';
import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import IJogosConsolesRepository from '@modules/jogos/repositories/IJogosConsolesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    nome: string,
    capa: string,
    idAdm: string,
    consoles: string[],
}

@injectable()
class CriaJogoService{
    constructor(
        @inject('ConsolesRepository')
        private consolesRepository: IConsolesRepository,

        @inject('JogosRepository')
        private jogosRepository: IJogosRepository,

        @inject('JogosConsolesRepository')
        private jogosConsolesRepository: IJogosConsolesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ){}

    public async executar({nome, consoles, capa, idAdm}: IRequest):Promise<Jogo> {
        const jogoExiste = await this.jogosRepository.acharPorNome(nome);

        if (jogoExiste){
            throw new AppError('Jogo já registrado');
        }

        const jogo = await this.jogosRepository.criar({
            nome,
            capa,
            idAdm
        });

        await this.storageProvider.salvarArquivo({
            arquivo: capa,
            pasta:'capas'
        });

        //Pra cada um dos consoles de jogo, cria um registro em jogos_consoles
        consoles.forEach( async console => {
            const consoleNoDB = await this.consolesRepository.acharPorNome(console);

            if(consoleNoDB){
                await this.jogosConsolesRepository.criar({
                    jogo, 
                    console: consoleNoDB
                });
            }    
        })
        
        return jogo;
    }
}

export default CriaJogoService;