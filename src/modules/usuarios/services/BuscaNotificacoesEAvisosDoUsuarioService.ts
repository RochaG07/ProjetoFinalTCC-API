import { injectable, inject } from 'tsyringe';

import INotificacoesRepository from '@modules/usuarios/repositories/INotificacoesRepository';
import Notificacao from '../infra/typeorm/entities/Notificacao';
import IAvisosRepository from '@modules/administradores/repositories/IAvisosRepository';
import Aviso from '@modules/administradores/infra/typeorm/entities/Aviso';

interface IRequest{
    idUser: string;
}

interface IResponse{
    notificacoes: Notificacao[],
    avisos: Aviso[],
}

@injectable()
class BuscaNotificacoesDoUsuarioService{
    constructor(
        @inject('NotificacoesRepository')
        private notificacoesRepository: INotificacoesRepository,
        @inject('AvisosRepository')
        private avisosRepository: IAvisosRepository,
    ){}
    
    public async executar({idUser}: IRequest):Promise<IResponse> {
        const notificacoes = await  this.notificacoesRepository.exibirTodos(idUser);

        const avisos = await this.avisosRepository.exibirTodos(idUser);

        return {
            notificacoes, 
            avisos
        };
    }
}

export default BuscaNotificacoesDoUsuarioService;