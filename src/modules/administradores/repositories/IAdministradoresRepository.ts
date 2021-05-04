import Administrador from '../infra/typeorm/entities/Administrador';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

export default interface IAdministradoresRepository{
    atribuiStatusDeAdm(usuario: Usuario): Promise<Administrador>;
    salvar(adm: Administrador): Promise<Administrador>;
    acharPorIdAdm(idAdm: string): Promise<Administrador | undefined>;
    acharPorIdUser(idUser: string): Promise<Administrador | undefined>;
}