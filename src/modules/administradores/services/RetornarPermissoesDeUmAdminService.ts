import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository';

import IPermissoesRepository from '../repositories/IPermissoesRepository';
import IPermissoesAdministradoresRepository from '../repositories/IPermissoesAdministradoresRepository';

@injectable()
class RetornarPermissoesDeUmAdminService{
    constructor(
        @inject('PermissoesRepository')
        private permissoesRepository: IPermissoesRepository,
        @inject('PermissoesAdministradoresRepository')
        private permissoesAdministradoresRepository: IPermissoesAdministradoresRepository,
        @inject('AdministradoresRepository')
        private administradoresRepository: IAdministradoresRepository,
    ){}

    public async executar( idAdm: string):Promise<string[]> {
        const admin = await this.administradoresRepository.acharPorIdAdm(idAdm);

        if(!admin){
            throw new AppError('Admin não existe', 404);
        }

        const idsPermissao = await this.permissoesAdministradoresRepository.retornaIdsPermissaoDeUmAdmin(idAdm);
        
        const permissoes: string[] = [];
        
        for (let i = 0; i < idsPermissao.length; i++) {
            const perm = await this.permissoesRepository.transformaIdPermEmNome(idsPermissao[i]);

            if(perm){
                permissoes.push(perm);
            }
        }

        return permissoes;
    }
}

export default RetornarPermissoesDeUmAdminService;