import { Request, Response } from 'express';

import { container } from 'tsyringe';

import BuscaNotificacoesDoUsuarioService from '@modules/usuarios/services/BuscaNotificacoesEAvisosDoUsuarioService';
import CriaNotificacaoService from '@modules/usuarios/services/CriaNotificacaoService';
import DeletaNotificacaoService from '@modules/usuarios/services/DeletaNotificacaoService';

export default class NotificacoesController{
    public async criar(request: Request, response: Response ):Promise<Response>{ 
        const {idUserAlvo, conteudo} = request.body;

        const criaNotificacao = container.resolve(CriaNotificacaoService);
    
        const notificacao= await criaNotificacao.executar({idUserAlvo, conteudo});

        return response.status(201).json(notificacao);
    }

    public async achar(request: Request, response: Response ):Promise<Response>{ 
        const idUser = request.user.id;

        const buscaNotificacoes = container.resolve(BuscaNotificacoesDoUsuarioService);
    
        const notificacoes = await buscaNotificacoes.executar({idUser});

        return response.status(200).json(notificacoes);
    }

    public async deletar(request: Request, response: Response ):Promise<Response>{ 
        const {idNotificacao} = request.params;

        const deletaNotificacao = container.resolve(DeletaNotificacaoService);
    
        await deletaNotificacao.executar({idNotificacao});

        return response.status(204).json();
    }
}