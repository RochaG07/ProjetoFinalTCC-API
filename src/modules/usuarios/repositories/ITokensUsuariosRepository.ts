import TokenUsuario from '../infra/typeorm/entities/TokenUsuario';

export default interface ITokensUsuariosRepository{
    gerar(idUser: string): Promise<TokenUsuario>;
    acharPorToken(token: string): Promise<TokenUsuario | undefined>;
}