import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import Troca from "../infra/typeorm/entities/Troca";

export default interface ICriarTrocaDTO{
    mensagem?: string,
    troca: Troca,
    usuario: Usuario,
}