import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Jogo from '@modules/jogos/infra/typeorm/entities/Jogo';

import IConsolesRepository from '@modules/jogos/repositories/IConsolesRepository';
import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import IJogosConsolesRepository from '@modules/jogos/repositories/IJogosConsolesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IJogoComConsoles{
    id: string,
    nome: string,
    capa_url: string,
    consoles: string[],
}

@injectable()
class ExibeJogosService{
    constructor(
        @inject('ConsolesRepository')
        private consolesRepository: IConsolesRepository,

        @inject('JogosRepository')
        private jogosRepository: IJogosRepository,

        @inject('JogosConsolesRepository')
        private jogosConsolesRepository: IJogosConsolesRepository,
    ){}

    public async executar():Promise<IJogoComConsoles[]> {
        const jogosComConsoles: IJogoComConsoles[] = [];

        const jogos = await this.jogosRepository.getJogos();

        for (let i = 0; i < jogos.length; i++) {
            //Pesquisar o idConsole relacionados a um jogo
            const idsConsole = await this.jogosConsolesRepository.getIdsConsolePorIdJogo(jogos[i].id);

            //Pesquisa o nome pelo idConsole
            const nomesConsoles: string[] = [];
            for (let j = 0; j < idsConsole.length; j++) {
                const nome = await this.consolesRepository.transformaIdConsoleEmNome(idsConsole[j]);

                if(nome){
                    nomesConsoles.push(nome);
                }         
            }

            jogosComConsoles.push({
                id: jogos[i].id,
                nome: jogos[i].nome,
                capa_url: jogos[i].getCapa_url(),
                consoles: nomesConsoles,
            })          
        }

        return jogosComConsoles;
    }
}

export default ExibeJogosService;