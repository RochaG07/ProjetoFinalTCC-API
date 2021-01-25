import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

import UsuariosController from '../controllers/UsuariosController';
import UsuariosAvatarController from '../controllers/UsuarioAvatarController';
import AvisosController from '@modules/administradores/infra/http/controllers/AvisosController';

import CustomerController from '../controllers/CustomerController';
import SubscriptionController from '../controllers/SubscriptionController';

const usuariosRouter = Router();

const upload = multer(uploadConfig.multer);

const usuariosController = new UsuariosController();
const usuariosAvatarController = new UsuariosAvatarController();
const avisosController = new AvisosController();

const customerController = new CustomerController();
const subscriptionController = new SubscriptionController();

usuariosRouter.post('/', usuariosController.criar);

usuariosRouter.patch('/avatar',
    requerAutenticacao,
    upload.single('avatar'),
    usuariosAvatarController.atualizar
);

usuariosRouter.get('/avisos',requerAutenticacao, avisosController.exibir);

usuariosRouter.post('/premium/customer',requerAutenticacao, customerController.criar);
usuariosRouter.get('/premium/customer',requerAutenticacao, customerController.achar);
usuariosRouter.put('/premium/customer',requerAutenticacao, customerController.alterar);

usuariosRouter.post('/premium/subscription',requerAutenticacao, subscriptionController.criar);

export default usuariosRouter;