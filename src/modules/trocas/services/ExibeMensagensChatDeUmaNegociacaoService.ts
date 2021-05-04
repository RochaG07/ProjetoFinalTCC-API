import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';
import MensagemChat from '../infra/typeorm/entities/MensagemChat';

import IMensagemChatRepository from '../repositories/IMensagemChatRepository';

@injectable()
class ExibeMensagensChatDeUmaNegociacaoService{
    constructor(
        @inject('MensagemChatRepository')
        private mensagemChatRepository: IMensagemChatRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar(idNeg: string):Promise<MensagemChat[]> {
        let mensagens = await this.cacheProvider.recover<MensagemChat[]>(`mensagens-chat:${idNeg}`);

        if(!mensagens){
            mensagens = await this.mensagemChatRepository.exibirDeUmaNegociacao(idNeg);

            await this.cacheProvider.save(`mensagens-chat:${idNeg}`, mensagens);
        }

        return mensagens;
    }
}

export default ExibeMensagensChatDeUmaNegociacaoService;