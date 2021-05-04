import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Troca from '../infra/typeorm/entities/Troca';
import Convite from '../infra/typeorm/entities/Convite';
import IConvitesRepository from '../repositories/IConvitesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface ITrocaComConvite {
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
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider 
    ){}

    public async executar(idUser : string):Promise<ITrocaComConvite[]> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe", 404);
        }

        const trocas = await this.trocasRepository.acharTodosDeUmUsuario(usuario);

        let trocasComConvites = await this.cacheProvider.recover<ITrocaComConvite[]>(`minhas-trocas:${usuario.id}`);

        if(!trocasComConvites){
            const trocasComConvitesTemp: ITrocaComConvite[] = [];

            for (let i = 0; i < trocas.length; i++) {
                const convites = await this.convitesRepository.acharTodosDeUmaTroca(trocas[i]);
    
                let convitesNaoRespondidos: number = 0;
    
                convites.forEach(convite => {
                    if(convite.foiAceito === null){
                        convitesNaoRespondidos++;
                    }
                })
    
                trocasComConvitesTemp.push({
                    troca: trocas[i],
                    convitesNaoRespondidos,
                })

            }

            trocasComConvites = trocasComConvitesTemp;

            await this.cacheProvider.save(`minhas-trocas:${usuario.id}`, classToClass(trocasComConvites));
        }

        return trocasComConvites;
    }
}

export default ExibeTrocasDeUmUsuarioService;