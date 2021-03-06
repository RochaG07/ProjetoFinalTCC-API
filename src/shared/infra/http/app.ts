import 'reflect-metadata';
import 'dotenv/config';

import express,{Request, Response, NextFunction} from 'express';

import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/container';
import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/avatares', express.static(uploadConfig.avataresFolder));
app.use('/capas', express.static(uploadConfig.capasFolder));

// Global exception handler 
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({ 
        status: 'error',
        message: 'Internal server error',
    });
});

export default app;