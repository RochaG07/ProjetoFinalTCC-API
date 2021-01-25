import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import  ConsolesController from '../controllers/ConsolesController';
import  JogosController from '../controllers/JogosController';

import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';
import requerStatusAdmin from '@shared/infra/http/middleware/requerStatusAdmin';

const jogosRouter = Router();

const consolesController = new ConsolesController();
const jogosController = new JogosController();

const upload = multer(uploadConfig.multer);

jogosRouter.post('/', requerAutenticacao, requerStatusAdmin, upload.single('capa'), jogosController.criar);
jogosRouter.get('/', jogosController.exibir);

jogosRouter.post('/consoles', requerAutenticacao, requerStatusAdmin, consolesController.criar);
jogosRouter.get('/consoles', consolesController.exibir);

export default jogosRouter;