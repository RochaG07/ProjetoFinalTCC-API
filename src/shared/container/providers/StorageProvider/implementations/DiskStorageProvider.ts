import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider{
    public async salvarArquivo(arquivo: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, arquivo),
            path.resolve(uploadConfig.uploadsFolder, arquivo),
        );

        return arquivo;
    }

    public async deletarArquivo(arquivo: string): Promise<void> {
        const filePath =  path.resolve(uploadConfig.uploadsFolder, arquivo);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }

}

export default DiskStorageProvider;