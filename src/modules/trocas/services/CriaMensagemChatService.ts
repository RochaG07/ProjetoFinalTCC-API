import { injectable, inject } from 'tsyringe';
import ICriarMensagemChatDTO from '../dtos/ICriarMensagemChatDTO';
import MensagemChat from '../infra/typeorm/entities/MensagemChat';
import IMensagemChatRepository from '../repositories/IMensagemChatRepository'

@injectable()
class CriaMensagemChatService {
    constructor(
        @inject('MensagemChatRepository')
        private mensagemChatRepository: IMensagemChatRepository
    ){}

    public async executar(data: ICriarMensagemChatDTO): Promise<MensagemChat>{
        const mensagemChat = await this.mensagemChatRepository.criar(data);

        return mensagemChat
    }
}

export default CriaMensagemChatService;