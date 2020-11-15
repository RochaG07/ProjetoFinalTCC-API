import { getRepository, Repository} from 'typeorm';

import INegociacoesRepository from '../../../repositories/INegociacoesRepository';
import ICriarNegociacaoDTO from '@modules/trocas/dtos/ICriarNegociacaoDTO';

import Negociacao from '../entities/Negociacao';
import Convite from '../entities/Convite';

class NegociacoesRepository implements INegociacoesRepository {
    private ormRepository: Repository<Negociacao>;

    constructor(){
        this.ormRepository= getRepository(Negociacao);
    }

    public async criar(convite: Convite): Promise<Negociacao>{
        const neg = this.ormRepository.create({
            idConvite: convite.id,
        });

        await this.ormRepository.save(neg);

        return neg;
    }

    public async acharPorId(id: string): Promise<Negociacao | undefined>{
        const neg = await this.ormRepository.findOne({
            where:{id}
        });

        return neg;
    }

    public async acharPorIdConvite(idConvite: string): Promise<Negociacao | undefined>{
        const neg = await this.ormRepository.findOne({
            where:{idConvite}
        });

        return neg;
    }

    public async salvar(neg: Negociacao): Promise<Negociacao>{
        return this.ormRepository.save(neg);
    }

}

export default NegociacoesRepository;