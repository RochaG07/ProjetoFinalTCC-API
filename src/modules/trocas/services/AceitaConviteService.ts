import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import Convite from '../infra/typeorm/entities/Convite';

import CriaNegociacaoService from "./CriaNegociacaoService";

interface IRequest {
    idConvite: string,
    idUser: string,
}

@injectable()
class AceitaConviteService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
    ){}

    public async executar({idConvite, idUser} : IRequest ):Promise<Convite> {
        //Verifica se id de usuário é valido e se pode aceitar (é o criador da troca)
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        console.log(idConvite);

        //Verifica se id de convite é valido e não deixar aceitar se o convite já tiver sido aceito
        const convite = await this.convitesRepository.acharPorId(idConvite);

        if(!convite){
            throw new AppError("Convite não existe");
        }

        if(convite.foiAceito){
            throw new AppError("Já foi aceito");
        }

        // Não deixar que um usuário aceite seu próprio convite
        const usuarioSolicitador = await this.usuariosRepository.acharPorId(convite.idUser_solicitador);

        if(!usuarioSolicitador){
            throw new AppError("Isso não deveria ser possível");
        }

        console.log(usuario);
        console.log(usuarioSolicitador);

        if(usuario.id === usuarioSolicitador.id){
            throw new AppError("O usuário que solicitou o convite não pode aceita-lo");
        }

        convite.foiAceito = true;
        convite.dataAceitacao = new Date(Date.now());

        await this.convitesRepository.salvar(convite);

        //Cria negociação
        const criaNegociacao = container.resolve(CriaNegociacaoService);

        criaNegociacao.executar(convite);

        return convite;
    }
}

export default AceitaConviteService;