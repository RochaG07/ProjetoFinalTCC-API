import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import  ConsolesController from '../controllers/ConsolesController';
import  JogosController from '../controllers/JogosController';

import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';
import requerStatusAdmin from '@shared/infra/http/middleware/requerStatusAdmin';

const jogosRouter = Router();

jogosRouter.use(requerAutenticacao);
jogosRouter.use(requerStatusAdmin);

const consolesController = new ConsolesController();
const jogosController = new JogosController();

const upload = multer(uploadConfig.multer);

jogosRouter.post('/', upload.single('capa'), jogosController.criar);

jogosRouter.post('/consoles', consolesController.criar);

export default jogosRouter;