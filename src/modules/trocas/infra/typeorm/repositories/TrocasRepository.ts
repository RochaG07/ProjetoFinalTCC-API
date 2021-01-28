import { getRepository, Repository, Not} from 'typeorm';

import ITrocasRepository from '../../../repositories/ITrocasRepository';
import ICriarTrocaDTO from '@modules/trocas/dtos/ICriarTrocaDTO';

import Troca from '../entities/Troca';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

class TrocasRepository implements ITrocasRepository {
    private ormRepository: Repository<Troca>;

    constructor(){
        this.ormRepository= getRepository(Troca);
    }

    public async criar(data: ICriarTrocaDTO): Promise<Troca>{
        const troca = this.ormRepository.create(data);

        await this.ormRepository.save(troca);

        return troca;
    }

    public async acharPorId(id: string): Promise<Troca | undefined>{
        const troca = await this.ormRepository.findOne({
            where:{id}
        });

        return troca;
    }

    public async acharTodosDeUmUsuario(usuario: Usuario): Promise<Troca[]>{
        //Colocar em um array todas as trocas de um usuário
        const trocas = await this.ormRepository.find({
            where:{idUser: usuario.id}
        });

        return trocas;
    }
    public async acharTodosMenosDeUmUsuario(usuario: Usuario): Promise<Troca[]>{
        //Colocar em um array todas as trocas de um usuário
        const trocas = await this.ormRepository.find({
            where:{idUser: Not(usuario.id)}
        });

        return trocas;
    }

    public async salvar(troca: Troca): Promise<Troca>{
        return this.ormRepository.save(troca);
    }
}

export default TrocasRepository;