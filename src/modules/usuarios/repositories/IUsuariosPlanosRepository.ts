import Usuario from '../infra/typeorm/entities/Usuario';
import UsuarioPlano from '../infra/typeorm/entities/UsuarioPlano';

import IAtribuirPlanoAoUsuarioDTO from '../dtos/IAtribuirPlanoAoUsuarioDTO';

export default interface IPlanosRepository{
    acharPlanoEspecificoDeUmUsuario(usuario: Usuario): Promise<UsuarioPlano | undefined>;
    atribuirPlanoAoUsuario(data: IAtribuirPlanoAoUsuarioDTO): Promise<UsuarioPlano>;
}