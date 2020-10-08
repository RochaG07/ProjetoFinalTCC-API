import { getRepository, Repository} from 'typeorm';

import IAdministradoresRepository from '../../../repositories/IAdministradoresRepository';

import Administrador from '../entities/Administrador';
import IAvisosRepository from '@modules/administradores/repositories/IAvisosRepository';
import ICriaAvisoDTO from '@modules/administradores/dtos/ICriaAvisoDTO';
import Aviso from '../entities/Aviso';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

class AvisosRepository implements IAvisosRepository {
    private ormRepository: Repository<Aviso>;

    constructor(){
        this.ormRepository= getRepository(Aviso);
    }

    public async criar({usuario, titulo, conteudo, idAdm}: ICriaAvisoDTO): Promise<Aviso>{
        const aviso = this.ormRepository.create({
            idUser: usuario.id,
            idAdm,
            titulo,
            conteudo,
        });
        
        await this.ormRepository.save(aviso);

        return aviso;
    }
    public async exibirTodosDeUsuario(usuario: Usuario): Promise<Aviso[]>{
        const avisos = this.ormRepository.find({
            where:{idUser: usuario.id}
        });
        
        return avisos;
    }
}

export default AvisosRepository;