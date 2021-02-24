import ICriarMensagemChatDTO from "@modules/trocas/dtos/ICriarMensagemChatDTO";
import IMensagemChatRepository from "@modules/trocas/repositories/IMensagemChatRepository";
import { getRepository, Repository } from "typeorm";
import MensagemChat from "../entities/MensagemChat";

class MensagemChatRepository implements IMensagemChatRepository{
    private ormRepository: Repository<MensagemChat>;

    constructor(){
        this.ormRepository = getRepository(MensagemChat)
    }

    public async criar(data: ICriarMensagemChatDTO): Promise<MensagemChat>{
        const mensagemChat = this.ormRepository.create(data);

        await this.ormRepository.save(mensagemChat);

        return mensagemChat;
    }

    public async exibirDeUmaNegociacao(idNeg: string): Promise<MensagemChat[]>{
        const mensagens = await this.ormRepository.find({
            where:{idNeg: idNeg},
        });

        return mensagens;
    }
}

export default MensagemChatRepository;