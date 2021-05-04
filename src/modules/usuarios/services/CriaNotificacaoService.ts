import { injectable, inject } from 'tsyringe';

import INotificacoesRepository from '../repositories/INotificacoesRepository';
import Notificacao from '../infra/typeorm/entities/Notificacao';

interface IRequest {
    conteudo: string,
    idUserAlvo: string,
}

@injectable()
class CriaNotificacaoService{
    constructor(
        @inject('NotificacoesRepository')
        private notificacoesRepository: INotificacoesRepository
    ){}
    
    public async executar({idUserAlvo, conteudo}: IRequest):Promise<Notificacao> {

        const notificacao = await this.notificacoesRepository.criar({
            idUser: idUserAlvo,
            conteudo,
        });

        return notificacao;
    }
}

export default CriaNotificacaoService;