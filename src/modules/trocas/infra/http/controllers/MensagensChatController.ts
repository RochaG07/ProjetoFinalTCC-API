import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaMensagemChatService from '@modules/trocas/services/CriaMensagemChatService';
import ExibeMensagensChatDeUmaNegociacaoService from '@modules/trocas/services/ExibeMensagensChatDeUmaNegociacaoService';

export default class MensagensChatController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const { conteudo, idNeg, nomeusuario } = request.body;

        const criaMensagemChat = container.resolve(CriaMensagemChatService);

        const mensagem = await criaMensagemChat.executar({
            conteudo,
            idNeg,
            nomeusuario
        });
        return response.json(mensagem);
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const { idNeg } = request.params;

        const exibeMensagensChatDeUmaNegociacao= container.resolve(ExibeMensagensChatDeUmaNegociacaoService);

        const mensagens = await exibeMensagensChatDeUmaNegociacao.executar(idNeg);

        return response.json(mensagens);
    }
}