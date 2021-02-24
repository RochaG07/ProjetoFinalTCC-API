import { injectable, inject, container } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

import AtualizaTrocasDisponiveisService from '@modules/usuarios/services/AtualizaTrocasDisponiveisService';
import RetornaAssinaturaService from './RetornaAssinaturaService';

interface IRequest {
    username: string,
    senha: string,
}

interface IResponse {
    usuario: Usuario,
    token: string,
    premiumAtivo: boolean,
}

@injectable()
class AutenticaUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
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

        let premiumAtivo = false;

        //Checa se premium é valido
        if(usuario.idSubscription){
            const retornaAssinatura = container.resolve(RetornaAssinaturaService);

            const subscription = await retornaAssinatura.executar(usuario.id);

            //TODO só verificar validade se o current_period_end já passou,

            if(subscription.status === 'active'){
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
        };
    }

}

export default AutenticaUsuarioService;