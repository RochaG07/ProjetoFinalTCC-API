import { getRepository, Repository} from 'typeorm';

import IPlanosRepository from '../../../repositories/IPlanosRepository';

import Plano from '../entities/Plano';

class PlanosRepository implements IPlanosRepository {
    private ormRepository: Repository<Plano>;

    constructor(){
        this.ormRepository= getRepository(Plano);
    }

    public async acharPorNome(nome: string): Promise<Plano | undefined>{
        const plano = await this.ormRepository.findOne({
            where:{nome}
        });

        return plano;
    }
}

export default PlanosRepository;