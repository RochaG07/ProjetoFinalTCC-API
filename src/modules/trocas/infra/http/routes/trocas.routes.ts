import { Router } from 'express';

import TrocasController from '../controllers/TrocasController';
import ConvitesController from '../controllers/ConvitesController';
import NegociacoesController from '../controllers/NegociacoesController';

import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

const trocasRouter = Router();

trocasRouter.use(requerAutenticacao);

const trocasController = new TrocasController();
const convitesController = new ConvitesController();
const negociacoesController = new NegociacoesController();

trocasRouter.post('/', trocasController.criar);
trocasRouter.get('/', trocasController.exibir);

trocasRouter.post('/convites', convitesController.criar);
trocasRouter.put('/convites', convitesController.alterar);
trocasRouter.get('/convites/:idTroca', convitesController.exibir);

trocasRouter.get('/negociacoes/:idTroca', negociacoesController.exibir);

export default trocasRouter;