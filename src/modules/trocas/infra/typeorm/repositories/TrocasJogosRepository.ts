import { getRepository, Repository} from 'typeorm';

import ITrocasJogosRepository from '../../../repositories/ITrocasJogosRepository';
import ICriarTrocaJogoDTO from '@modules/trocas/dtos/ICriarTrocaJogoDTO';

import TrocaJogo from '../entities/TrocaJogo';

class TrocasJogosRepository implements ITrocasJogosRepository {
    private ormRepository: Repository<TrocaJogo>;

    constructor(){
        this.ormRepository= getRepository(TrocaJogo);
    }

    public async criar({troca, jogo}: ICriarTrocaJogoDTO): Promise<TrocaJogo>{
        const trocaJogo = this.ormRepository.create({
            troca,
            jogo,
        });

        await this.ormRepository.save(trocaJogo);

        return trocaJogo;
    }

    public async acharPorId(id: string): Promise<TrocaJogo | undefined>{
        const trocaJogo = await this.ormRepository.findOne({
            where:{id}
        });

        return trocaJogo;
    }

    public async acharPorIdTroca(idTroca: string): Promise<TrocaJogo | undefined>{
        const trocaJogo = await this.ormRepository.findOne({
            where:{idTroca}
        });

        return trocaJogo;
    }
}

export default TrocasJogosRepository;