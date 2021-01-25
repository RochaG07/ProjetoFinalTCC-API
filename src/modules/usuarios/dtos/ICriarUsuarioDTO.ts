export default interface ICriarUsuarioDTO{
    username: string,
    email: string,
    senha: string,
    nome: string,
    telefone?: string;
    municipio: string;
    estado: string;
}