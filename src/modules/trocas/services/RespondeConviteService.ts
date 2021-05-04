import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import Convite from '../infra/typeorm/entities/Convite';

import CriaNegociacaoService from "./CriaNegociacaoService";

interface IRequest {
    idConvite: string,
    idUser: string,
    respostaAoConvite: "aceitar" | "recusar",
}

@injectable()
class RespondeConviteService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
    ){}

    public async executar({idConvite, idUser, respostaAoConvite} : IRequest ):Promise<Convite> {
        //Verifica se id de usuário é valido e se pode aceitar (é o criador da troca)
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe", 404);
        }

        //Verifica se id de convite é valido e não deixar aceitar se o convite já tiver sido aceito
        const convite = await this.convitesRepository.acharPorId(idConvite);

        if(!convite){
            throw new AppError("Convite não existe", 404);
        }

        if(convite.foiAceito !== null){
            throw new AppError("Já foi aceito/recusado", 401);
        }

        // Não deixar que um usuário aceite seu próprio convite
        const usuarioSolicitador = await this.usuariosRepository.acharPorId(convite.idUser_solicitador);

        if(!usuarioSolicitador){
            throw new AppError('', 401);
        }

        if(usuario.id === usuarioSolicitador.id){
            throw new AppError("O usuário que solicitou o convite não pode responde-lo", 401);
        }

        if(respostaAoConvite === "aceitar"){
            convite.foiAceito = true;

            const criaNegociacao = container.resolve(CriaNegociacaoService);
    
            await criaNegociacao.executar({
                convite,
                idUser_criador: usuario.id,
                idUser_solicitador: usuarioSolicitador.id
            });
    
        } else if(respostaAoConvite === "recusar"){
            convite.foiAceito = false;
        }

        convite.dataResposta = new Date(Date.now());

        await this.convitesRepository.salvar(convite);

        return convite;
    }
}

export default RespondeConviteService;