import { injectable, inject } from 'tsyringe';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import INegociacoesRepository from '@modules/trocas/repositories/INegociacoesRepository';

import Convite from '../infra/typeorm/entities/Convite';
import Negociacao from '../infra/typeorm/entities/Negociacao';

@injectable()
class CriaNegociacaoService{
    constructor(
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository
    ){}

    public async executar(convite: Convite):Promise<Negociacao> {
        //Deve ser executada quando um convite for aceito    
        const negociacao = this.negociacoesRepository.criar(convite);

        return negociacao;
    }
}

export default CriaNegociacaoService;