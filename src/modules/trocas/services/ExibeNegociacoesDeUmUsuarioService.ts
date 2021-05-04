import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';

import ITrocasRepository from '../repositories/ITrocasRepository';
import INegociacoesRepository from '../repositories/INegociacoesRepository';
import Negociacao from '../infra/typeorm/entities/Negociacao';

import ExibeNegociacoesDeUmaTrocaService from './ExibeNegociacoesDeUmaTrocaService';
import Troca from '../infra/typeorm/entities/Troca';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ITotalidadeNegs{
    negsCriador: Ineg[],
    negsSolicitador: Ineg[],
}

interface Ineg{
    id: string,
    ativo: boolean,
    idConvite: string,
    troca: Troca,
    nomeUsuarioCriador: string,
    nomeUsuarioSolicitador: string,
    idUsuarioCriador: string,
    idUsuarioSolicitador: string
}

@injectable()
class ExibeNegociacoesDeUmUsuarioService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('ConvitesRepository')
        private convitesRepository: IConvitesRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
        @inject('NegociacoesRepository')
        private negociacoesRepository: INegociacoesRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async executar(idUser: string):Promise<ITotalidadeNegs> {
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe", 404);
        }

        const negsEmCache = await this.cacheProvider.recover<ITotalidadeNegs>(`minhas-negociacoes:${usuario.id}`);

        if(!negsEmCache){
            //Negociações das trocas em que o usuário é o criador da troca
            const trocas = await this.trocasRepository.acharTodosDeUmUsuario(usuario);

            const exibeNegociacoesDeUmaTroca = container.resolve(ExibeNegociacoesDeUmaTrocaService);

            const negsCriador: Ineg[] = [];
            const negsSolicitador: Ineg[] = [];

            for (let i = 0; i < trocas.length; i++) {
                const negs = await exibeNegociacoesDeUmaTroca.executar({
                    idTroca: trocas[i].id,
                    idUser: usuario.id,
                })
    
                for (let j = 0; j < negs.length; j++) {
                    const convite = await this.convitesRepository.acharPorId(negs[j].idConvite);
    
                    if(!convite){
                        throw new AppError('');
                    }
     
                    const nomeUsuarioCriador = await this.usuariosRepository.transformaIdEmNome(trocas[i].idUser);
    
                    if(!nomeUsuarioCriador){
                        throw new AppError('');
                    }
                
                    negsCriador.push({
                        id: negs[j].id,
                        ativo: negs[j].ativo,
                        idConvite: negs[j].idConvite,
                        troca: trocas[i],
                        nomeUsuarioCriador, 
                        nomeUsuarioSolicitador: convite.nome_solicitador,
                        idUsuarioCriador: trocas[i].idUser,
                        idUsuarioSolicitador: convite.idUser_solicitador
                    });
                }
            }
            //Todos os convites que o usuário esta envolvido
            const convites = await this.convitesRepository.acharTodosDeUmIdUser_solicitador(usuario.id);
    
            //Lista as negociações de convites aceitos
    
            for (let i = 0; i < convites.length; i++) {
                if(convites[i].foiAceito){
                    const neg = await this.negociacoesRepository.acharPorIdConvite(convites[i].id);
    
                    const troca = await this.trocasRepository.acharPorId(convites[i].idTroca);
                    if(!troca){
                        throw new AppError('');
                    }
                     
                    const nomeUsuarioCriador = await this.usuariosRepository.transformaIdEmNome(troca.idUser);
    
                    if(!nomeUsuarioCriador){
                        throw new AppError('');
                    }
    
                    if(neg){
                        negsSolicitador.push({
                            id: neg.id,
                            ativo: neg.ativo,
                            idConvite: neg.idConvite,
                            troca,
                            nomeUsuarioCriador, 
                            nomeUsuarioSolicitador: convites[i].nome_solicitador,
                            idUsuarioCriador: troca.idUser,
                            idUsuarioSolicitador: convites[i].idUser_solicitador
                        });
                    }
                }
            }

            await this.cacheProvider.save(`minhas-negociacoes:${usuario.id}`, {negsCriador, negsSolicitador});

            return {
                negsCriador,
                negsSolicitador,
            };
        }
        
        return negsEmCache;
    }
}

export default ExibeNegociacoesDeUmUsuarioService;