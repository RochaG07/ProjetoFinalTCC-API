import { injectable, inject } from 'tsyringe';
import MensagemChat from '../infra/typeorm/entities/MensagemChat';

import IMensagemChatRepository from '../repositories/IMensagemChatRepository';

@injectable()
class ExibeMensagensChatDeUmaNegociacaoService{
    constructor(
        @inject('MensagemChatRepository')
        private mensagemChatRepository: IMensagemChatRepository
    ){}

    public async executar(idNeg: string):Promise<MensagemChat[]> {
        const mensagens = this.mensagemChatRepository.exibirDeUmaNegociacao(idNeg);

        return mensagens;
    }
}

export default ExibeMensagensChatDeUmaNegociacaoService;