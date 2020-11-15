import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

export default interface IProductProvider {
    getPlanos(): Promise<void>;
}