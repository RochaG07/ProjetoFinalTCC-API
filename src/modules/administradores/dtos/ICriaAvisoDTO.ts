import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

export default interface ICriaAvisoDTO{
    usuario: Usuario,
    titulo: string,
    conteudo: string,
    idAdm: string,
}