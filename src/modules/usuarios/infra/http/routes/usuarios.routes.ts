import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

import UsuariosController from '../controllers/UsuariosController';
import UsuariosAvatarController from '../controllers/UsuarioAvatarController';
import AvisosController from '@modules/administradores/infra/http/controllers/AvisosController';
import PremiumController from '../controllers/PremiumController';

import { container } from 'tsyringe';

const usuariosRouter = Router();

const upload = multer(uploadConfig.multer);

const usuariosController = new UsuariosController();
const usuariosAvatarController = new UsuariosAvatarController();
const avisosController = new AvisosController();

const premiumController = new PremiumController();

usuariosRouter.post('/', usuariosController.criar);

usuariosRouter.patch('/avatar',
    requerAutenticacao,
    upload.single('avatar'),
    usuariosAvatarController.atualizar
);

usuariosRouter.get('/avisos',requerAutenticacao, avisosController.exibir);

usuariosRouter.post('/premium',requerAutenticacao, premiumController.criar);

export default usuariosRouter;