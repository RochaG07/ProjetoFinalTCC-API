import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import INegociacoesRepository from '@modules/trocas/repositories/INegociacoesRepository';

import Convite from '../infra/typeorm/entities/Convite';
import Negociacao from '../infra/typeorm/entities/Negociacao';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IConvitesRepository from '../repositories/IConvitesRepository';

interface IRequest{
    idUser: string,
    idNeg: string,
}

@injectable()
class DesativaNegociacaoService{
    constructor(
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar({idUser, idNeg}: IRequest):Promise<void> {
        let neg = await this.negociacoesRepository.acharPorId(idNeg);

        if(!neg){
            throw new AppError('Negociação não encontrada', 404);
        }

        if(!neg.ativo){
            throw new AppError('Negociação já desativada', 401);
        }

        neg.ativo = false;

        console.log();

        const convite = await this.convitesRepository.acharPorId(neg.idConvite);

        if(!convite){
            throw new AppError('Convite não encontrado', 404);
        }

        console.log(idUser);
        console.log(convite.idUser_solicitador);


        this.cacheProvider.invalidate(`minhas-negociacoes:${idUser}`);
        this.cacheProvider.invalidate(`minhas-negociacoes:${convite.idUser_solicitador}`);

        this.negociacoesRepository.salvar(neg);
    }
}

export default DesativaNegociacaoService;