import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';
import ICriarMensagemChatDTO from '../dtos/ICriarMensagemChatDTO';
import MensagemChat from '../infra/typeorm/entities/MensagemChat';
import IMensagemChatRepository from '../repositories/IMensagemChatRepository'

@injectable()
class CriaMensagemChatService {
    constructor(
        @inject('MensagemChatRepository')
        private mensagemChatRepository: IMensagemChatRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar({conteudo, idNeg, nomeusuario}: ICriarMensagemChatDTO): Promise<MensagemChat>{
        const mensagemChat = await this.mensagemChatRepository.criar({conteudo, idNeg, nomeusuario});

        this.cacheProvider.invalidate((`mensagens-chat:${idNeg}`));

        return mensagemChat
    }
}

export default CriaMensagemChatService;