import Negociacao from '../infra/typeorm/entities/Negociacao';

import ICriarNegociacaoDTO from '@modules/trocas/dtos/ICriarNegociacaoDTO';

export default interface INegociacoesRepository{
    criar(data: ICriarNegociacaoDTO): Promise<Negociacao>;
    acharPorId(id: string): Promise<Negociacao | undefined>;
    acharPorIdConvite(idConvite: string): Promise<Negociacao | undefined>;

}