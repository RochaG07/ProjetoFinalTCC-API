import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import Troca from '../infra/typeorm/entities/Troca';

@injectable()
class ExibeTrocasService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('TrocasRepository')
        private trocasRepository: ITrocasRepository,
    ){}

    public async executar(idUser : string):Promise<Troca[]> {
        ///Exibe as trocas do usuário logado juntamente com seus convites
        //Verifica se id de usuário é valido
        const usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Usuário não existe");
        }

        const trocas = await this.trocasRepository.acharTodosMenosDeUmUsuario(usuario);


        return trocas;
    }
}

export default ExibeTrocasService;