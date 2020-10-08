import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import Convite from '../infra/typeorm/entities/Convite';

import ITrocasRepository from '../repositories/ITrocasRepository';
import INegociacoesRepository from '../repositories/INegociacoesRepository';
import Negociacao from '../infra/typeorm/entities/Negociacao';

interface IRequest{
    idUser: string,
    idTroca: string,
}

@injectable()
class ExibeNegociacoesDeUmaTrocaService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository,
    ){}

    public async executar({idUser, idTroca} : IRequest):Promise<Negociacao[]> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //Verifica se id de troca é valido
        const troca = await this.trocasRepository.acharPorId(idTroca);
        
        if(!troca){
            throw new AppError("Troca não existe");
        }

        //Quais convites foram direcionados à troca
        const convites = await this.convitesRepository.acharTodosDeUmaTroca(troca);

        //Quais convites foram aceitos e geraram uma neg
        const convitesAceitos = convites.filter(c => c.foiAceito);

        const negociacoes: Negociacao[] = [];

        //Dá push no array de negs a neg de cada convite aceito
        for (let index = 0; index < convitesAceitos.length; index++) {
            const neg = await this.negociacoesRepository.acharPorIdConvite(convitesAceitos[index].id);

            if(neg){
                //Só colocar no array se o usuário estiver presente na negociação
                const idUserCriadorDaTroca = troca.idUser;
                const idUserSolicitadorDaNeg = convitesAceitos[index].idUser_solicitador;

                if(usuario.id === idUserCriadorDaTroca || usuario.id === idUserSolicitadorDaNeg){
                    negociacoes.push(neg);
                }
            }    
        }

        return negociacoes;
    }
}

export default ExibeNegociacoesDeUmaTrocaService;