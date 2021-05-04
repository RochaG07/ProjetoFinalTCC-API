import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Troca from '../infra/typeorm/entities/Troca';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest{
    idUser: string,
    estado: string | undefined,
    municipio: string | undefined, 
    nomeJogoOfertado: string | undefined, 
    nomeJogoDesejado: string | undefined, 
    nomeConsoleJogoOfertado: string | undefined, 
    nomeConsoleJogoDesejado: string | undefined
}

@injectable()
class ExibeTrocasService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar({
        idUser, 
        estado, 
        municipio, 
        nomeJogoOfertado, 
        nomeJogoDesejado, 
        nomeConsoleJogoOfertado, 
        nomeConsoleJogoDesejado
    } : IRequest):Promise<Troca[]> {
        ///Exibe as trocas do usuário logado juntamente com seus convites
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe", 404);
        }

        let trocas = await this.cacheProvider.recover<Troca[]>(`trocas-disponiveis:${usuario.id}`);


        if(!trocas){
            trocas = await this.trocasRepository.acharTodosMenosDeUmUsuario(usuario);
            
            await this.cacheProvider.save(`trocas-disponiveis:${usuario.id}`, classToClass(trocas));
        }

        //Aplica filtro
        if(estado){
            trocas = trocas.filter(troca => {
                //A query de municipio depende que as query de estado esteja ativa
                if(municipio){
                    return (
                        troca.estado === estado &&
                        troca.municipio === municipio
                    )
                } else {
                    return (
                        troca.estado === estado
                    )
                }
            });
        }

        if(nomeJogoOfertado){
            trocas = trocas.filter(troca => {
                if(nomeConsoleJogoOfertado){
                    return (
                        troca.nomeJogoOfertado === nomeJogoOfertado &&
                        troca.nomeConsoleJogoOfertado === nomeConsoleJogoOfertado
                    )
                } else {
                    return (
                        troca.nomeJogoOfertado === nomeJogoOfertado
                    )
                }
            });
        }
        
        if(nomeJogoDesejado){
            trocas = trocas.filter(troca => {
                if(nomeConsoleJogoDesejado){
                    return (
                        troca.nomeJogoDesejado === nomeJogoDesejado &&
                        troca.nomeConsoleJogoDesejado === nomeConsoleJogoDesejado
                    )
                } else {
                    return (
                        troca.nomeJogoDesejado === nomeJogoDesejado
                    )
                }
            });
        }
        
        return trocas;
    }
}

export default ExibeTrocasService;