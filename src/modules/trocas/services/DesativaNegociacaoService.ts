import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import INegociacoesRepository from '@modules/trocas/repositories/INegociacoesRepository';

import Convite from '../infra/typeorm/entities/Convite';
import Negociacao from '../infra/typeorm/entities/Negociacao';

interface IRequest{
    idUser: string,
    idNeg: string,
}

@injectable()
class DesativaNegociacaoService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository,
    ){}

    public async executar({idUser, idNeg}: IRequest):Promise<void> {
        let neg = await this.negociacoesRepository.acharPorId(idNeg);

        if(!neg){
            throw new AppError('Negociação não encontrada');
        }

        if(!neg.ativo){
            throw new AppError('Negociação já desativada');
        }

        neg.ativo = false;

        this.negociacoesRepository.salvar(neg);
    }
}

export default DesativaNegociacaoService;