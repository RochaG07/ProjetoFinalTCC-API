import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import Convite from '../infra/typeorm/entities/Convite';

import CriaNegociacaoService from "./CriaNegociacaoService";

interface IRequest {
    idConvite: string,
    idUser: string,
    respostaAoConvite: string,
}

@injectable()
class AceitaConviteService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
    ){}

    public async executar({idConvite, idUser, respostaAoConvite} : IRequest ):Promise<Convite> {

        if(respostaAoConvite !== "aceitar" && respostaAoConvite !== "recusar"){
            throw new AppError("Resposta ao convite inválida");
        }

        //Verifica se id de usuário é valido e se pode aceitar (é o criador da troca)
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //Verifica se id de convite é valido e não deixar aceitar se o convite já tiver sido aceito
        const convite = await this.convitesRepository.acharPorId(idConvite);

        if(!convite){
            throw new AppError("Convite não existe");
        }

        if(convite.foiAceito !== null){
            throw new AppError("Já foi aceito/recusado");
        }

        // Não deixar que um usuário aceite seu próprio convite
        const usuarioSolicitador = await this.usuariosRepository.acharPorId(convite.idUser_solicitador);

        if(!usuarioSolicitador){
            throw new AppError("Isso não deveria ser possível");
        }

        if(usuario.id === usuarioSolicitador.id){
            throw new AppError("O usuário que solicitou o convite não pode responde-lo");
        }

        if(respostaAoConvite === "aceitar"){
            convite.foiAceito = true;
        
            //Cria negociação
            const criaNegociacao = container.resolve(CriaNegociacaoService);
    
            await criaNegociacao.executar(convite);
    
        } else if(respostaAoConvite === "recusar"){
            convite.foiAceito = false;
        }

        convite.dataResposta = new Date(Date.now());

        await this.convitesRepository.salvar(convite);

        return convite;
    }
}

export default AceitaConviteService;