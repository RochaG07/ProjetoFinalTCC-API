import { Router } from 'express';

import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';
import requerStatusAdmin from '@shared/infra/http/middleware/requerStatusAdmin';

import  AdministradoresController from '../controllers/AdministradoresController';
import  AvisosController from '../controllers/AvisosController';

const adminRouter = Router();

adminRouter.use(requerAutenticacao);
adminRouter.use(requerStatusAdmin);

const adminController = new AdministradoresController();
const avisoController = new AvisosController();

adminRouter.post('/', adminController.criar);

adminRouter.post('/avisos', avisoController.criar);

export default adminRouter;