import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import IFileParamsDTO from '../dtos/IFileParamsDTO';

class DiskStorageProvider implements IStorageProvider{
    public async salvarArquivo({arquivo, pasta}: IFileParamsDTO): Promise<string> {
        if(pasta === "avatares"){
            await fs.promises.rename(
                path.resolve(uploadConfig.tmpFolder, arquivo),
                path.resolve(uploadConfig.avataresFolder, arquivo),
            );
        } else {
            await fs.promises.rename(
                path.resolve(uploadConfig.tmpFolder, arquivo),
                path.resolve(uploadConfig.capasFolder, arquivo),
            );
        }

        return arquivo;
    }

    public async deletarArquivo({arquivo, pasta}: IFileParamsDTO): Promise<void> {
        
        let filePath;
        if(pasta === "avatares"){
            filePath =  path.resolve(uploadConfig.avataresFolder, arquivo);
        } else {
            filePath =  path.resolve(uploadConfig.capasFolder, arquivo);
        }

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }

}

export default DiskStorageProvider;