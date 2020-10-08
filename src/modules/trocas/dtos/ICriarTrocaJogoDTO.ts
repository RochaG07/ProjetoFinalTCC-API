import Jogo from "@modules/jogos/infra/typeorm/entities/Jogo";
import Troca from "../infra/typeorm/entities/Troca";

export default interface ICriarTrocaJogoDTO{
    troca: Troca,
    jogo: Jogo,
}