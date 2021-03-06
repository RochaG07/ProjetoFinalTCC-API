import Convite from '../infra/typeorm/entities/Convite';

import ICriarConviteDTO from '@modules/trocas/dtos/ICriarConviteDTO';
import Troca from '../infra/typeorm/entities/Troca';

export default interface IConvitesRepository{
    criar(data: ICriarConviteDTO): Promise<Convite>;
    salvar(convite: Convite): Promise<Convite>;
    acharPorId(id: string): Promise<Convite | undefined>;
    acharTodosDeUmaTroca(troca: Troca): Promise<Convite[]>;
    acharTodosDeUmIdUser_solicitador(IdUser_solicitador: string): Promise<Convite[]>;
}