import ICriarMensagemChatDTO from "../dtos/ICriarMensagemChatDTO";
import MensagemChat from "../infra/typeorm/entities/MensagemChat";

export default interface IMensagemChatRepository{
    criar(data: ICriarMensagemChatDTO): Promise<MensagemChat>;
    exibirDeUmaNegociacao(idNeg: string): Promise<MensagemChat[]>;
}