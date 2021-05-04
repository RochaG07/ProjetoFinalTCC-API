import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Convite from '../infra/typeorm/entities/Convite';
import INotificacoesRepository from '@modules/usuarios/repositories/INotificacoesRepository';
import Troca from '../infra/typeorm/entities/Troca';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    mensagem?: string,
    idTroca: string,
    idUser: string,
}

interface IResponse{
    convite: Convite,
    troca: Troca,
}

@injectable()
class CriaConviteService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar({mensagem, idTroca, idUser}:IRequest):Promise<IResponse> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe", 404);
        }

        //Verificar validade da troca
        const troca = await this.trocasRepository.acharPorId(idTroca);

        if(!troca || !troca.ativo){
            throw new AppError("Troca não existe", 404);
        }
        if(!troca.ativo){
            throw new AppError("Troca desativada", 401);
        }

        //Não deixa enviar convite pra uma troca própria
        if(usuario.id === troca.idUser){
            throw new AppError("Não é possível enviar convites para sua própria troca", 401);
        }

        //Limitar para 1 o número de convites criados de um usuário para uma troca
        const errors: string[] = [];

        const convitesDaTroca = await this.convitesRepository.acharTodosDeUmaTroca(troca);

        //Verifica nos convites da troca, se o usuário já mandou um convite retorna um erro
        convitesDaTroca.forEach(conviteDaTroca => {
            if(conviteDaTroca.idUser_solicitador === idUser){
                errors.push("usuário já enviou uma soliciatação para esta troca");
            }
        });
        if (errors.length > 0) {
            throw new AppError(errors.join(), 401);
        }
        
        const convite = await this.convitesRepository.criar({
            mensagem,
            idTroca: troca.id,
            idUser_solicitador: usuario.id,
            nome_solicitador: usuario.nome,
        });

        await this.cacheProvider.invalidate(`minhas-trocas:${troca.idUser}`);

        return {
            convite,
            troca
        };
    }
}

export default CriaConviteService;