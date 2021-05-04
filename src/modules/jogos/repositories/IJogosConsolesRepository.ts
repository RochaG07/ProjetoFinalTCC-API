import JogoConsole from "@modules/jogos/infra/typeorm/entities/JogoConsole";

import ICriarJogoConsoleDTO from "@modules/jogos/dtos/ICriarJogoConsoleDTO";

export default interface IJogosConsoleRepository{
    criar(data: ICriarJogoConsoleDTO): Promise<JogoConsole>;
    getIdsConsolePorIdJogo(idJogo: string): Promise<string[]>;
    deletarPorIdJogo(idJogo: string): Promise<void>;
    deletarPorIdConsole(idConsole: string): Promise<void>;
}