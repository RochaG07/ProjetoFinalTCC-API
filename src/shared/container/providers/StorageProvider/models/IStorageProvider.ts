import IFileParamsDTO from '../dtos/IFileParamsDTO';

export default interface IStorageProvider {
    salvarArquivo( data: IFileParamsDTO): Promise<string>;
    deletarArquivo( data: IFileParamsDTO): Promise<void>;
}