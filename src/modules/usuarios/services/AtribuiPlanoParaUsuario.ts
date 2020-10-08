import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IUsuariosPlanosRepository from '../repositories/IUsuariosPlanosRepository';
import IPlanosRepository from '../repositories/IPlanosRepository';

import Usuario from '../infra/typeorm/entities/Usuario';

@injectable()
class AtribuiPlanoParaUsuario{
    constructor(
        @inject('PlanosRepository')
        private planosRepository: IPlanosRepository,

        @inject('UsuariosPlanosRepository')
        private usuariosPlanosRepository: IUsuariosPlanosRepository,
    ){}

    public async executar(usuario: Usuario):Promise<void> {

        //Verifica se o usuário já tem um plano atribuido
        const usuarioPlano = await this.usuariosPlanosRepository.acharPlanoEspecificoDeUmUsuario(usuario);

        console.log(usuarioPlano);

        if(!usuarioPlano){
            //Designa o plano gratuito caso o o usuário não haja plano nenhum
            const plano = await this.planosRepository.acharPorNome('gratuito'); 

            console.log(plano);

            if(!plano){
                throw new AppError("Plano indisponível por algum motivo");
            }

            this.usuariosPlanosRepository.atribuirPlanoAoUsuario({usuario, plano});
        }
    }
}

export default AtribuiPlanoParaUsuario;