import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Console from '@modules/jogos/infra/typeorm/entities/Console';

import IConsolesRepository from '@modules/jogos/repositories/IConsolesRepository';

interface IRequest {
    nome: string,
    idAdm: string,
}

@injectable()
class CriaConsoleService{
    constructor(
        @inject('ConsolesRepository')
        private consolesRepository: IConsolesRepository,
    ){}

    public async executar({nome, idAdm}: IRequest):Promise<Console> {

        const consoleExiste = await this.consolesRepository.acharPorNome(nome);

        if (consoleExiste){
            throw new AppError('Console já registrado');
        }

        const console = await this.consolesRepository.criar({
            nome, 
            idAdm
        });

        return console;
    }
}

export default CriaConsoleService;