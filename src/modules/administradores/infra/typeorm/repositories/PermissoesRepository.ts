import { getRepository, Repository} from 'typeorm';

import IAdministradoresRepository from '../../../repositories/IAdministradoresRepository';

import Administrador from '../entities/Administrador';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Permissao from '../entities/Permissao';
import IPermissoesRepository from '@modules/administradores/repositories/IPermissoesRepository';

class PermissoesRepository implements IPermissoesRepository {
    private ormRepository: Repository<Permissao>;

    constructor(){
        this.ormRepository= getRepository(Permissao);
    }

    public async acharPorNome(nome: string): Promise<Permissao | undefined>{
        const permissao = this.ormRepository.findOne({
            where:{nome}
        });
        
        return permissao;
    }

    public async transformaIdPermEmNome(idPerm: string): Promise<string | undefined>{
        const permissao = await this.ormRepository.findOne({
            where:{id: idPerm}
        });
        
        if(permissao){
            return permissao.nome;
        } else {
            return undefined;
        }
    }
}

export default PermissoesRepository;