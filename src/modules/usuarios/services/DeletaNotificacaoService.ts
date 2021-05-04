import { injectable, inject } from 'tsyringe';

import INotificacoesRepository from '../repositories/INotificacoesRepository';

interface IRequest {
    idNotificacao: string,
}

@injectable()
class DeletaNotificacaoService{
    constructor(
        @inject('NotificacoesRepository')
        private notificacoesRepository: INotificacoesRepository
    ){}
    
    public async executar({idNotificacao}: IRequest):Promise<void> {

        this.notificacoesRepository.deletar(idNotificacao);
    }
}

export default DeletaNotificacaoService;