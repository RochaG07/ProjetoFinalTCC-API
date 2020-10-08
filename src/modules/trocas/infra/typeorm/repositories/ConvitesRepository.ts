import { container } from 'tsyringe';

import { getRepository, Repository} from 'typeorm';

import IConvitesRepository from '../../../repositories/IConvitesRepository';
import ICriarConviteDTO from '@modules/trocas/dtos/ICriarConviteDTO';

import Convite from '../entities/Convite';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

import TrocasRepository from './TrocasRepository';
import Troca from '../entities/Troca';

class ConvitesRepository implements IConvitesRepository {
    private ormRepository: Repository<Convite>;

    constructor(){
        this.ormRepository= getRepository(Convite);
    }

    public async criar(data: ICriarConviteDTO): Promise<Convite>{
      const convite = this.ormRepository.create(data);

      await this.ormRepository.save(convite);

      return convite;
    }

    public async salvar(convite: Convite): Promise<Convite>{
        return this.ormRepository.save(convite);
    }

    public async acharPorId(id: string): Promise<Convite | undefined>{
        const convite = await this.ormRepository.findOne({
            where:{id}
        });

        return convite;
    }

    public async acharTodosDeUmaTroca(troca: Troca): Promise<Convite[]>{
        //Colocar em um array todas as trocas de um usuário
        //Colocar em um array todas as trocas de um usuário
        const convites = await this.ormRepository.find({
            where:{idTroca: troca.id}
        });

        return convites;
    }

}

export default ConvitesRepository;