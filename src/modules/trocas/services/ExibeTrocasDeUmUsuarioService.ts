import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Troca from '../infra/typeorm/entities/Troca';
import Convite from '../infra/typeorm/entities/Convite';
import IConvitesRepository from '../repositories/IConvitesRepository';

interface IResponse {
    troca: Troca;   
    convitesNaoRespondidos: number;
}

@injectable()
class ExibeTrocasDeUmUsuarioService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
    ){}

    public async executar(idUser : string):Promise<IResponse[]> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        const trocas = await this.trocasRepository.acharTodosDeUmUsuario(usuario);

        const trocasComConvites: IResponse[] = [];

        for (let i = 0; i < trocas.length; i++) {
            const convites = await this.convitesRepository.acharTodosDeUmaTroca(trocas[i]);

            let convitesNaoRespondidos: number = 0;

            convites.forEach(convite => {
                if(convite.foiAceito === null){
                    convitesNaoRespondidos++;
                }
            })

            trocasComConvites.push({
                troca: trocas[i],
                convitesNaoRespondidos,
            })
        }

        return trocasComConvites;
    }
}

export default ExibeTrocasDeUmUsuarioService;