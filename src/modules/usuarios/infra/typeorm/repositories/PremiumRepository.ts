import { getRepository, Repository} from 'typeorm';

import IPremiumRepository from '@modules/usuarios/repositories/IPremiumRepository';
import Premium from '../entities/Premium';

class PremiumRepository implements IPremiumRepository {
    private ormRepository: Repository<Premium>;

    constructor(){
        this.ormRepository= getRepository(Premium);
    }

    public async criar(idUser: string): Promise<Premium>{
        const premium = this.ormRepository.create({
            idUser: idUser
        });

        await this.ormRepository.save(premium);

        return premium;
    }

    public async salvar(premium: Premium): Promise<Premium>{
        return this.ormRepository.save(premium);
    }

    public async acharPorIdUser(idUser: string): Promise<Premium | undefined>{
        const premium = await this.ormRepository.findOne({
            where:{idUser}
        });

        return premium;
    }

}

export default PremiumRepository;