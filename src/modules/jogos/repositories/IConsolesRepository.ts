import Console from "@modules/jogos/infra/typeorm/entities/Console";

import ICriarConsoleDTO from "@modules/jogos/dtos/ICriarConsoleDTO";

export default interface IConsoleRepository{
    criar(data: ICriarConsoleDTO): Promise<Console>;
    acharPorNome(nome: string): Promise<Console | undefined>;
    acharPorId(id: string): Promise<Console | undefined>;
    transformaIdConsoleEmNome(idConsole: string): Promise<string | undefined>;
    getConsoles(): Promise<Console[]>;
    deletarPorId(id: string): Promise<void>;

}