import Plano from '../infra/typeorm/entities/Plano';

export default interface IPlanosRepository{
    acharPorNome(nome: string): Promise<Plano | undefined>;
}