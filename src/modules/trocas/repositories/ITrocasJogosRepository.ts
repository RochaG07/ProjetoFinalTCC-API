import ICriarTrocaJogoDTO from '../dtos/ICriarTrocaJogoDTO';
import TrocaJogo from '../infra/typeorm/entities/TrocaJogo';

export default interface ITrocasJogosRepository{
    criar(data: ICriarTrocaJogoDTO): Promise<TrocaJogo>;
    acharPorId(id: string): Promise<TrocaJogo | undefined>;
}