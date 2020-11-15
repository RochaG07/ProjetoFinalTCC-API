import ICriarUsuarioDTO from '../dtos/ICriarUsuarioDTO';

import Usuario from '../infra/typeorm/entities/Usuario';

export default interface IUsuariosRepository{
    criar(data: ICriarUsuarioDTO): Promise<Usuario>;
    salvar(usuario: Usuario): Promise<Usuario>;
    acharPorEmail(email: string): Promise<Usuario | undefined>;
    acharPorId(id: string): Promise<Usuario | undefined>;
    acharPorUsername(username: string): Promise<Usuario | undefined>;
    acharPorNome(nome: string): Promise<Usuario | undefined>;
    transformaIdEmNome(id: string): Promise<string | undefined>;

}