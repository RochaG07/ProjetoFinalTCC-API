import { injectable, inject } from 'tsyringe';

import INegociacoesRepository from '@modules/trocas/repositories/INegociacoesRepository';

import Convite from '../infra/typeorm/entities/Convite';
import Negociacao from '../infra/typeorm/entities/Negociacao';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest{
    convite: Convite,
    idUser_criador: string,
    idUser_solicitador: string,
}

@injectable()
class CriaNegociacaoService{
    constructor(
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar({convite, idUser_criador, idUser_solicitador}: IRequest):Promise<Negociacao> {
        //Deve ser executada quando um convite for aceito    
        const negociacao = await this.negociacoesRepository.criar(convite);

        console.log(idUser_criador);
        console.log(idUser_solicitador);
        
        this.cacheProvider.invalidate(`minhas-negociacoes:${idUser_criador}`);
        this.cacheProvider.invalidate(`minhas-negociacoes:${idUser_solicitador}`);

        return negociacao;
    }
}

export default CriaNegociacaoService;