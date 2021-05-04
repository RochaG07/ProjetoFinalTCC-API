import ICriarNotificacaoDTO from '@modules/usuarios/dtos/ICriarNotificacaoDTO';
import INotificacoesRepository from '@modules/usuarios/repositories/INotificacoesRepository';
import { getRepository, Repository} from 'typeorm';
import Notificacao from '../entities/Notificacao';


class NotificacoesRepository implements INotificacoesRepository {
    private ormRepository: Repository<Notificacao>;

    constructor(){
        this.ormRepository= getRepository(Notificacao);
    }

    public async criar({conteudo, idUser}: ICriarNotificacaoDTO): Promise<Notificacao>{
        const notificacao = this.ormRepository.create({
            conteudo,
            idUser
        });

        await this.ormRepository.save(notificacao);

        return notificacao;
    }


    public async exibirTodos(idUser: string): Promise<Notificacao[]>{
        const notificacoes = await this.ormRepository.find({
            where: {idUser}
        });

        return notificacoes;
    }

    public async deletar(id: string): Promise<void>{
        await this.ormRepository.delete({
            id
        });
    }
}

export default NotificacoesRepository;