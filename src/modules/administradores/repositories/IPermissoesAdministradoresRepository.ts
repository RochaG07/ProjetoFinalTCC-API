import ICriarPermissaoAdminDTO from '../dtos/ICriarPermissaoAdminDTO';
import PermissaoAdministrador from '../infra/typeorm/entities/PermissaoAdministrador';

export default interface IPermissoesAdministradoresRepository{
    criar(data: ICriarPermissaoAdminDTO): Promise<PermissaoAdministrador>;
    retornaIdsPermissaoDeUmAdmin(idAdm: string): Promise<string[]>;
    deletarTodasDeUmAdm(idAdm: string): Promise<void>;
}