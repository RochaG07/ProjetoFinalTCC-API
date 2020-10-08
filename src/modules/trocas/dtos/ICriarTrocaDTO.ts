import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

export default interface ICriarTrocaDTO{
    descricao: string,
    usuario: Usuario,
}