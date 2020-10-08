import { getRepository, Repository} from 'typeorm';

import IAtribuirPlanoAoUsuarioDTO from '../../../dtos/IAtribuirPlanoAoUsuarioDTO';

import IUsuariosPlanosRepository from '../../../repositories/IUsuariosPlanosRepository';

import Usuario from '../entities/Usuario';
import UsuarioPlano from '../entities/UsuarioPlano';

class UsuariosPlanosRepository implements IUsuariosPlanosRepository {
    private ormRepository: Repository<UsuarioPlano>;

    constructor(){
        this.ormRepository= getRepository(UsuarioPlano);
    }

    public async acharPlanoEspecificoDeUmUsuario(usuario: Usuario): Promise<UsuarioPlano | undefined>{
        const usuarioPlano = await this.ormRepository.findOne({
            where:{usuario}
        });

        return usuarioPlano;
    }

    public async atribuirPlanoAoUsuario(data: IAtribuirPlanoAoUsuarioDTO): Promise<UsuarioPlano>{
        const usuarioPlano = this.ormRepository.create(data);

        await this.ormRepository.save(usuarioPlano);

        return usuarioPlano;
    }
}

export default UsuariosPlanosRepository;