import Plano from "../infra/typeorm/entities/Plano";
import Usuario from "../infra/typeorm/entities/Usuario";

export default interface ICriarUsuarioDTO{
    usuario: Usuario,
    plano: Plano,
}