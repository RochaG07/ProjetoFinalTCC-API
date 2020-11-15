import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Convite from '../infra/typeorm/entities/Convite';

interface IRequest {
    mensagem?: string,
    idTroca: string,
    idUser: string,
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
    ){}

    public async executar({mensagem, idTroca, idUser}:IRequest):Promise<Convite> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        //Verificar validade da troca
        const troca = await this.trocasRepository.acharPorId(idTroca);

        if(!troca || !troca.ativo){
            throw new AppError("Troca não existe");
        }
        if(!troca.ativo){
            throw new AppError("Troca desativada");
        }

        //Não deixa enviar convite pra uma troca própria
        if(usuario.id === troca.idUser){
            throw new AppError("Não é possível enviar convites para sua própria troca");
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
            throw new AppError(errors.join());
        }
        
        const convite = await this.convitesRepository.criar({
            mensagem,
            idTroca: troca.id,
            idUser_solicitador: usuario.id,
            nome_solicitador: usuario.nome,
        });

        return convite;
    }
}

export default CriaConviteService;