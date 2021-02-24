import { Router } from 'express';

import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';
import requerStatusAdmin from '@shared/infra/http/middleware/requerStatusAdmin';

import  AdministradoresController from '../controllers/AdministradoresController';
import  AvisosController from '../controllers/AvisosController';
import  PermissoesController from '../controllers/PermissoesController';

const adminRouter = Router();

adminRouter.use(requerAutenticacao);
adminRouter.use(requerStatusAdmin);

const adminController = new AdministradoresController();
const avisoController = new AvisosController();
const permissoesController = new PermissoesController();

adminRouter.post('/', adminController.criar);
adminRouter.get('/', adminController.exibir);

adminRouter.post('/avisos', avisoController.criar);
adminRouter.get('/avisos', avisoController.exibir);

adminRouter.post('/permissoes', permissoesController.criar);

export default adminRouter;