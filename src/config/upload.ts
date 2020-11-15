// Armazena as configurações de upload de imagens/arquivos

import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    avataresFolder:string;
    capasFolder:string;

    multer: {
        storage: StorageEngine;
    },
    config: {   
        disk: {};
        aws: {
            bucket: string,
        };
    };
}   

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,
    
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    avataresFolder: path.resolve(tmpFolder, 'avatares'),
    capasFolder: path.resolve(tmpFolder, 'capas'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;
    
                return callback(null, fileName);
            },
        }),
    },
    
    config: {
        disk: {},
        aws: {
         bucket: 'app-tcc',
        },
   }

} as IUploadConfig;