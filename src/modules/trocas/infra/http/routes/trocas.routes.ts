import { Router } from 'express';

import TrocasController from '../controllers/TrocasController';
import ConvitesController from '../controllers/ConvitesController';
import NegociacoesController from '../controllers/NegociacoesController';
import MensagensChatController from '../controllers/MensagensChatController';

import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

const trocasRouter = Router();

//trocasRouter.use(requerAutenticacao);

const trocasController = new TrocasController();
const convitesController = new ConvitesController();
const negociacoesController = new NegociacoesController();
const mensagensChatController = new MensagensChatController();

trocasRouter.post('/', requerAutenticacao, trocasController.criar);
trocasRouter.get('/', requerAutenticacao, trocasController.exibir);
trocasRouter.delete('/:idTroca', requerAutenticacao, trocasController.desativar);

trocasRouter.get('/proprias', requerAutenticacao, trocasController.exibirDoUsuario);

trocasRouter.post('/convites', requerAutenticacao, convitesController.criar);
trocasRouter.put('/convites', requerAutenticacao, convitesController.alterar);
trocasRouter.get('/convites/:idTroca', requerAutenticacao, convitesController.exibir);

trocasRouter.get('/negociacoes', requerAutenticacao, negociacoesController.exibir);
trocasRouter.delete('/negociacoes/:idNeg', requerAutenticacao, negociacoesController.desativar);

trocasRouter.post('/mensagemChat', mensagensChatController.criar);
trocasRouter.get('/mensagemChat/:idNeg', mensagensChatController.exibir);

export default trocasRouter;