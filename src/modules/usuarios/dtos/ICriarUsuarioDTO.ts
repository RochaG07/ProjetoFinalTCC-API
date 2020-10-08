export default interface ICriarUsuarioDTO{
    username: string,
    email: string,
    senha: string,
    nome: string,
    telefone?: string;
    bairro: string;
    cidade: string;
    uf: string;
}