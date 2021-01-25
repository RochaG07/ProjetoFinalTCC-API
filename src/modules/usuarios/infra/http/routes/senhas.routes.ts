import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EsqueciMinhaSenhaController from '../controllers/EsqueciMinhaSenhaController';
import ResetaSenhaController from '../controllers/ResetaSenhaController';


const senhasRouter = Router();
const esqueciMinhaSenhaController = new EsqueciMinhaSenhaController();
const resetaSenhaController = new ResetaSenhaController();

senhasRouter.post(
    '/esqueci', 
    celebrate({
        [Segments.BODY]:{
            email: Joi.string().email().required(),
        }
    }),
    esqueciMinhaSenhaController.criar,
    );

    senhasRouter.post('/resetar_senha',
    celebrate({
        [Segments.BODY]:{
            token: Joi.string().uuid().required(),
            senha: Joi.string().required(),
            senha_confirmacao: Joi.string().required().valid(Joi.ref('senha')),
        }
    }),
    resetaSenhaController.criar,
);

export default senhasRouter;