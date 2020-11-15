import Jogo from "@modules/jogos/infra/typeorm/entities/Jogo";

import ICriarJogoDTO from "@modules/jogos/dtos/ICriarJogoDTO";

export default interface IJogosRepository{
    criar(data: ICriarJogoDTO): Promise<Jogo>;
    acharPorNome(nome: string): Promise<Jogo | undefined>;
    acharPorId(id: string): Promise<Jogo | undefined>;
    getJogos(): Promise<Jogo[]>;
}

