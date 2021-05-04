import Notificacao from '@modules/usuarios/infra/typeorm/entities/Notificacao';
import ICriarNotificacaoDTO from '../dtos/ICriarNotificacaoDTO';


export default interface INotificacoesRepository{
    criar({conteudo, idUser}: ICriarNotificacaoDTO): Promise<Notificacao>;
    exibirTodos(idUser: string): Promise<Notificacao[]>;
    deletar(id: string): Promise<void>;
}