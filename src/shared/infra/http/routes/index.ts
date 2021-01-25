import { Router } from 'express';

import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';
import sessoesRouter from '@modules/usuarios/infra/http/routes/sessoes.routes';
import perfilRouter from '@modules/usuarios/infra/http/routes/perfil.routes';
import adminRouter from '@modules/administradores/infra/http/routes/admin.routes';
import jogosRouter from '@modules/jogos/infra/http/routes/jogos.router';
import trocasRouter from '@modules/trocas/infra/http/routes/trocas.routes';
import senhasRouter from '@modules/usuarios/infra/http/routes/senhas.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/sessoes', sessoesRouter);
routes.use('/perfil', perfilRouter);
routes.use('/admin', adminRouter);
routes.use('/jogos', jogosRouter);
routes.use('/trocas', trocasRouter);
routes.use('/senhas', senhasRouter);


export default routes;