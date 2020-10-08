import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import requerAutenticacao from '@shared/infra/http/middleware/requerAutenticacao';

import UsuariosController from '../controllers/UsuariosController';
import UsuariosAvatarController from '../controllers/UsuarioAvatarController';
import AvisosController from '@modules/administradores/infra/http/controllers/AvisosController';

const usuariosRouter = Router();

const upload = multer(uploadConfig.multer);

const usuariosController = new UsuariosController();
const usuariosAvatarController = new UsuariosAvatarController();
const avisosController = new AvisosController();

usuariosRouter.post('/', usuariosController.criar);

usuariosRouter.patch('/avatar',
    requerAutenticacao,
    upload.single('avatar'),
    usuariosAvatarController.atualizar
);

usuariosRouter.get('/avisos',requerAutenticacao, avisosController.exibir);

export default usuariosRouter;