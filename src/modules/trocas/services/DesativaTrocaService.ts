import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import INegociacoesRepository from '@modules/trocas/repositories/INegociacoesRepository';

import ExibeNegociacoesDeUmaTrocaService from './ExibeNegociacoesDeUmaTrocaService';
import DesativaNegociacaoService from './DesativaNegociacaoService';

import Convite from '../infra/typeorm/entities/Convite';
import Negociacao from '../infra/typeorm/entities/Negociacao';

interface IRequest{
    idUser: string,
    idTroca: string,
}

@injectable()
class DesativaTrocaService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
    ){}

    public async executar({idUser, idTroca}: IRequest):Promise<void> {
        let troca = await this.trocasRepository.acharPorId(idTroca);

        if(!troca){
            throw new AppError('Troca não encontrada');
        }

        if(!troca.ativo){
            throw new AppError('Troca já foi desativada');
        }
        
        //Desativa negociações da troca
        const exibeNegociacoesDeUmaTroca = container.resolve(ExibeNegociacoesDeUmaTrocaService);
        const desativaNegociacao = container.resolve(DesativaNegociacaoService);
        
        const negs = await exibeNegociacoesDeUmaTroca.executar({idUser, idTroca});

        negs.forEach(async neg => {
            if(neg.ativo){
                await desativaNegociacao.executar({
                    idUser,
                    idNeg: neg.id,
                });
            }
        });

        troca.ativo = false;

        await this.trocasRepository.salvar(troca);
    }
}

export default DesativaTrocaService;