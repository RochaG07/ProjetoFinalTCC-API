import { Router } from 'express';

import  PerfilController from '../controllers/PerfilController';
import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

const perfilRouter = Router();

perfilRouter.use(requerAutenticacao);

const perfilController = new PerfilController();

perfilRouter.get('/', perfilController.mostrar)

perfilRouter.put('/', perfilController.atualizar)

export default perfilRouter;