import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

import UsuariosController from '../controllers/UsuariosController';
import UsuariosAvatarController from '../controllers/UsuarioAvatarController';

import CustomerController from '../controllers/CustomerController';
import SubscriptionController from '../controllers/SubscriptionController';
import PremiumController from '../controllers/PremiumController';

import NotificacoesController from '../controllers/NotificacoesController';

const usuariosRouter = Router();

const upload = multer(uploadConfig.multer);

const usuariosController = new UsuariosController();
const usuariosAvatarController = new UsuariosAvatarController();
const notificacoesController = new NotificacoesController();

const premiumController = new PremiumController();
const customerController = new CustomerController();
const subscriptionController = new SubscriptionController();


usuariosRouter.post('/', usuariosController.criar);

usuariosRouter.patch('/avatar',
    requerAutenticacao,
    upload.single('avatar'),
    usuariosAvatarController.atualizar
);

usuariosRouter.post('/premium', requerAutenticacao, premiumController.criar);

usuariosRouter.put('/premium/customer', requerAutenticacao, customerController.alterar);

usuariosRouter.delete('/premium/subscription', requerAutenticacao, subscriptionController.cancelar);
usuariosRouter.put('/premium/subscription', requerAutenticacao, subscriptionController.alterar);

usuariosRouter.post('/notificacoes', notificacoesController.criar);
usuariosRouter.get('/notificacoes', requerAutenticacao, notificacoesController.achar);
usuariosRouter.delete('/notificacoes/:idNotificacao', requerAutenticacao, notificacoesController.deletar);

export default usuariosRouter;