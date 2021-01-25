//Prepara os respositories para serem injetados como dependencia

import { container } from 'tsyringe';

import '@modules/usuarios/providers';
import './providers';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import UsuariosRepository from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepository';

import ITokensUsuariosRespository from '@modules/usuarios/repositories/ITokensUsuariosRepository';
import TokensUsuariosRepository from '@modules/usuarios/infra/typeorm/repositories/TokensUsuariosRepository';

import IAdministradoresRepository from '@modules/administradores/repositories/IAdministradoresRepository'
import AdministradoresRepository from '@modules/administradores/infra/typeorm/repositories/AdministradoresRepository';

import IJogosRepository from '@modules/jogos/repositories/IJogosRepository';
import JogosRepository from '@modules/jogos/infra/typeorm/repositories/JogosRepository';

import IConsolesRepository from '@modules/jogos/repositories/IConsolesRepository';
import ConsolesRepository from '@modules/jogos/infra/typeorm/repositories/ConsolesRepository';

import IJogosConsolesRepository from '@modules/jogos/repositories/IJogosConsolesRepository';
import JogosConsolesRepository from '@modules/jogos/infra/typeorm/repositories/JogosConsolesRepository';

import ITrocasRepository from '@modules/trocas/repositories/ITrocasRepository';
import TrocasRepository from '@modules/trocas/infra/typeorm/repositories/TrocasRepository';

import ITrocasJogosRepository from '@modules/trocas/repositories/ITrocasJogosRepository';
import TrocasJogosRepository from '@modules/trocas/infra/typeorm/repositories/TrocasJogosRepository';

import INegociacoesRepository from '@modules/trocas/repositories/INegociacoesRepository';
import NegociacoesRepository from '@modules/trocas/infra/typeorm/repositories/NegociacoesRepository';

import IConvitesRepository from '@modules/trocas/repositories/IConvitesRepository';
import ConvitesRepository from '@modules/trocas/infra/typeorm/repositories/ConvitesRepository';

import IAvisosRepository from '@modules/administradores/repositories/IAvisosRepository';
import AvisosRepository from '@modules/administradores/infra/typeorm/repositories/AvisosRepository';

import IPermissoesRepository from '@modules/administradores/repositories/IPermissoesRepository';
import PermissoesRepository from '@modules/administradores/infra/typeorm/repositories/PermissoesRepository';

import IPermissoesAdministradoresRepository from '@modules/administradores/repositories/IPermissoesAdministradoresRepository';
import PermissoesAdministradoresRepository from '@modules/administradores/infra/typeorm/repositories/PermissoesAdministradoresRepository';

container.registerSingleton<IUsuariosRepository>(
    'UsuariosRepository',
    UsuariosRepository
)

container.registerSingleton<ITokensUsuariosRespository>(
    'TokensUsuariosRepository',
    TokensUsuariosRepository
)

container.registerSingleton<IAdministradoresRepository>(
    'AdministradoresRepository',
    AdministradoresRepository
)

container.registerSingleton<IJogosRepository>(
    'JogosRepository',
    JogosRepository
)

container.registerSingleton<IConsolesRepository>(
    'ConsolesRepository',
    ConsolesRepository
)

container.registerSingleton<IJogosConsolesRepository>(
    'JogosConsolesRepository',
    JogosConsolesRepository
)

container.registerSingleton<ITrocasRepository>(
    'TrocasRepository',
    TrocasRepository
)

container.registerSingleton<ITrocasJogosRepository>(
    'TrocasJogosRepository',
    TrocasJogosRepository
)

container.registerSingleton<INegociacoesRepository>(
    'NegociacoesRepository',
    NegociacoesRepository
)

container.registerSingleton<IConvitesRepository>(
    'ConvitesRepository',
    ConvitesRepository
)


container.registerSingleton<IAvisosRepository>(
    'AvisosRepository',
    AvisosRepository
)

container.registerSingleton<IPermissoesRepository>(
    'PermissoesRepository',
    PermissoesRepository
)

container.registerSingleton<IPermissoesAdministradoresRepository>(
    'PermissoesAdministradoresRepository',
    PermissoesAdministradoresRepository
)
