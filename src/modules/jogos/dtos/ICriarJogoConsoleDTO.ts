import Jogo from "../infra/typeorm/entities/Jogo";
import Console from "../infra/typeorm/entities/Console";

export default interface ICriarJogoConsoleDTO{
    jogo: Jogo,
    console: Console,
}