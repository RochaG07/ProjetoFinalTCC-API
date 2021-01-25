import Permissao from '../infra/typeorm/entities/Permissao';

export default interface IPermissoesRepository{
    acharPorNome(nome: string): Promise<Permissao | undefined>;
    transformaIdPermEmNome(idPerm: string): Promise<string | undefined>;
    
}