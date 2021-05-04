import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvisosRepository from '../repositories/IAvisosRepository';

interface IRequest{
    idAviso: string,
}

@injectable()
class DesativaAvisoService{
    constructor(
        @inject('AvisosRepository')
        private avisosRepository: IAvisosRepository,
    ){}

    public async executar({idAviso}: IRequest):Promise<void> {
        let aviso = await this.avisosRepository.getAviso(idAviso);

        if(!aviso){
            throw new AppError('Aviso não encontrado', 404);
        }

        aviso.ativo = false;

        await this.avisosRepository.salvar(aviso);
    }
}

export default DesativaAvisoService;