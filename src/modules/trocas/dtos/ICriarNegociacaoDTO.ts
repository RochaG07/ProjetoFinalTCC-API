import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import Troca from "@modules/trocas/infra/typeorm/entities/Troca";

export default interface ICriarNegociacaoDTO{
    troca: Troca,
    usuario: Usuario,
}