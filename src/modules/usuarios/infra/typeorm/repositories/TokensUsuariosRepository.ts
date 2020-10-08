import { getRepository, Repository} from 'typeorm';

import ITokensUsuariosRepository from '../../../repositories/ITokensUsuariosRepository';

import TokenUsuario from '../entities/TokenUsuario';

class TokensUsuariosRepository implements ITokensUsuariosRepository {
    private ormRepository: Repository<TokenUsuario>;

    constructor(){
        this.ormRepository= getRepository(TokenUsuario);
    }

    public async gerar(idUser: string): Promise<TokenUsuario>{
        const TokenUsuario = this.ormRepository.create({idUser});

        await this.ormRepository.save(TokenUsuario);

        return TokenUsuario;
    }

    public async acharPorToken(token: string): Promise<TokenUsuario | undefined>{
        const TokenUsuario = this.ormRepository.findOne({
            where:{token}
        });

        return TokenUsuario;
    }

}

export default TokensUsuariosRepository;