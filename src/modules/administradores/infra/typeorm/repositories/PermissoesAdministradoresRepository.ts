import { getRepository, Repository} from 'typeorm';

import IAdministradoresRepository from '../../../repositories/IAdministradoresRepository';

import Administrador from '../entities/Administrador';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Permissao from '../entities/Permissao';
import IPermissoesRepository from '@modules/administradores/repositories/IPermissoesRepository';
import IPermissoesAdministradoresRepository from '@modules/administradores/repositories/IPermissoesAdministradoresRepository';
import ICriarPermissaoAdminDTO from '@modules/administradores/dtos/ICriarPermissaoAdminDTO';
import PermissaoAdministrador from '../entities/PermissaoAdministrador';

class PermissoesAdministradoresRepository implements IPermissoesAdministradoresRepository {
    private ormRepository: Repository<PermissaoAdministrador>;

    constructor(){
        this.ormRepository= getRepository(PermissaoAdministrador);
    }

    public async criar({idAdm, idPerm}: ICriarPermissaoAdminDTO): Promise<PermissaoAdministrador>{
        const permissaoAdm = this.ormRepository.create({idAdm, idPerm});

        await this.ormRepository.save(permissaoAdm);

        return permissaoAdm;
    }
    
    public async retornaIdsPermissaoDeUmAdmin(idAdm: string): Promise<string[]>{
        const permissoesAdm = await this.ormRepository.find({
            where:{idAdm}
        });
        
        return permissoesAdm.map(permissaoAdm => (permissaoAdm.idPerm));
    }

    public async deletarTodasDeUmAdm(idAdm: string): Promise<void>{
        await this.ormRepository.delete({
            idAdm
        })
    }

}

export default PermissoesAdministradoresRepository;