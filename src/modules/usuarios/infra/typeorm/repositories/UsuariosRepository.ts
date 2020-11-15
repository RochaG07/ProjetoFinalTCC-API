import { getRepository, Repository} from 'typeorm';

import IUsuariosRepository from '../../../repositories/IUsuariosRepository';
import ICriarUsuarioDTO from '../../../dtos/ICriarUsuarioDTO';

import Usuario from '../entities/Usuario';

class UsuariosRepository implements IUsuariosRepository {
    private ormRepository: Repository<Usuario>;

    constructor(){
        this.ormRepository= getRepository(Usuario);
    }

    public async criar(userData: ICriarUsuarioDTO): Promise<Usuario>{
        const usuario = this.ormRepository.create(userData);

        await this.ormRepository.save(usuario);

        return usuario;
    }

    public async salvar(usuario: Usuario): Promise<Usuario>{
        return this.ormRepository.save(usuario);
    }

    public async acharPorId(id: string): Promise<Usuario | undefined>{
        const usuario = await this.ormRepository.findOne(id);

        return usuario;
    }

    public async acharPorEmail(email: string): Promise<Usuario | undefined>{
        const usuario = await this.ormRepository.findOne({
            where:{email}
        });

        return usuario;
    }

    public async acharPorUsername(username: string): Promise<Usuario | undefined>{
        const usuario = await this.ormRepository.findOne({
            where:{username}
        });

        return usuario;
    }
    
    public async acharPorNome(nome: string): Promise<Usuario | undefined>{
        const usuario = await this.ormRepository.findOne({
            where:{nome}
        });

        return usuario;
    }
    
    public async transformaIdEmNome(id: string): Promise<string | undefined>{
        const usuario = await this.ormRepository.findOne({
            where:{id}
        });

        if(usuario !== undefined){
            return usuario.nome;
        }
        else{
            return undefined;
        }
    }
}

export default UsuariosRepository;