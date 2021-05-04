import { getRepository, Repository} from 'typeorm';

import IAdministradoresRepository from '../../../repositories/IAdministradoresRepository';

import Administrador from '../entities/Administrador';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

class PlanosRepository implements IAdministradoresRepository {
    private ormRepository: Repository<Administrador>;

    constructor(){
        this.ormRepository= getRepository(Administrador);
    }

    public async atribuiStatusDeAdm(usuario: Usuario): Promise<Administrador>{
        const administrador = this.ormRepository.create({
            idUser: usuario.id
        });
        
        await this.ormRepository.save(administrador);

        return administrador;
    }

    public async salvar(adm: Administrador): Promise<Administrador>{
        return this.ormRepository.save(adm);
    }

    public async acharPorIdAdm(idAdm: string): Promise<Administrador | undefined>{
        const administrador = await this.ormRepository.findOne({
            where:{id: idAdm}
        });

        return administrador;
    }

    public async acharPorIdUser(idUser: string): Promise<Administrador | undefined>{
        const administrador = await this.ormRepository.findOne({
            where:{idUser}
        });

        return administrador;
    }
}

export default PlanosRepository;