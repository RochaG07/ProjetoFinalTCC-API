import Premium from "../infra/typeorm/entities/Premium";

export default interface IPremiumRepository{
    criar(idUser: string): Promise<Premium>;
    salvar(premium: Premium): Promise<Premium>;
    acharPorIdUser(idUser: string): Promise<Premium | undefined>;

}