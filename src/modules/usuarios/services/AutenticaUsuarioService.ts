import { injectable, inject, container } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

import AtualizaTrocasDisponiveisService from '@modules/usuarios/services/AtualizaTrocasDisponiveisService';
import RetornaAssinaturaService from './RetornaAssinaturaService';
import IPremiumRepository from '../repositories/IPremiumRepository';
import AutenticaPremiumService from './AutenticaPremiumService';
import { classToClass } from 'class-transformer';

interface IRequest {
    username: string,
    senha: string,
}

interface IResponse {
    usuario: Usuario,
    token: string,
    premiumAtivo: boolean,
    premiumExpiracao: Date | undefined,
    statusPremium: string,
}

@injectable()
class AutenticaUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('PremiumRepository')
        private premiumRepository: IPremiumRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async executar({username, senha}:IRequest):Promise<IResponse> {
        let usuario = await this.usuariosRepository.acharPorUsername(username);
        
        if(!usuario){
            throw new AppError('Combinação usuário/senha incorreta', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(senha, usuario.senha);

        if(!passwordMatched){
            throw new AppError('Combinação usuário/senha incorreta', 401);
        }

        //Envia para o front os valores de trocasDisponiveise e proxTrocaDisp 
        //atualizados com base no horário logado
        const atualizaTrocasDisponiveis = container.resolve(AtualizaTrocasDisponiveisService);

        let {trocasDisponiveis, proxTrocaDisp} = await atualizaTrocasDisponiveis.executar(usuario);

        usuario.trocasDisponiveis = trocasDisponiveis;
        usuario.proxTrocaDisp = proxTrocaDisp;

        let premium = await this.premiumRepository.acharPorIdUser(usuario.id);

        if(!premium){
            throw new AppError("Premium não encontrado", 401);
        }

        let premiumAtivo = false;

        //Checa se premium é valido
        if(premium.status === 'ativo' && premium.dataExpiracao){

            const autenticaPremium = container.resolve(AutenticaPremiumService);

            await autenticaPremium.executar({
                dataExpiracao: premium.dataExpiracao,
                premium,
            });

            //Status continua ativo após verificação
            if(premium.status === 'ativo'){
                premiumAtivo = true;
            }
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: usuario.id,
            expiresIn,
        });

        return {
            usuario,
            token,
            premiumAtivo,
            statusPremium: premium.status,
            premiumExpiracao: premium.dataExpiracao
        };
    }

}

export default AutenticaUsuarioService;