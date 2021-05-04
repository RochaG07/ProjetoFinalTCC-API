import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriaTrocaService from '@modules/trocas/services/CriaTrocaService';
import ExibeTrocas from '@modules/trocas/services/ExibeTrocasService';
import ExibeTrocasDeUmUsuario from '@modules/trocas/services/ExibeTrocasDeUmUsuarioService';
import DesativaTroca from '@modules/trocas/services/DesativaTrocaService';

import { classToClass } from 'class-transformer';

export default class TrocasController{
    public async criar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {descricao, idJogoOfertado, idJogoDesejado, consoleJogoDesejado, consoleJogoOfertado} = request.body;

        const criaTroca = container.resolve(CriaTrocaService);

        const troca = await criaTroca.executar({
            descricao,
            idUser,
            idJogoOfertado,
            idJogoDesejado,
            consoleJogoDesejado,
            consoleJogoOfertado,
        });

        return response.status(201).json(classToClass(troca));
    }

    public async exibir(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        let {
            estado, 
            municipio, 
            nomeJogoOfertado, 
            nomeJogoDesejado, 
            nomeConsoleJogoOfertado, 
            nomeConsoleJogoDesejado
        } = request.query;

        //Certifica-se de que as queries sejam ou uma string ou undefined (caso esteja vazia)
        typeof(estado) === 'string' ? estado = String(estado) : estado = undefined
        typeof(municipio) === 'string' ? municipio = String(municipio) : municipio = undefined
        typeof(nomeJogoOfertado) === 'string' ? nomeJogoOfertado = String(nomeJogoOfertado) : nomeJogoOfertado = undefined
        typeof(nomeJogoDesejado) === 'string' ? nomeJogoDesejado = String(nomeJogoDesejado) : nomeJogoDesejado = undefined
        typeof(nomeConsoleJogoOfertado) === 'string' ? nomeConsoleJogoOfertado = String(nomeConsoleJogoOfertado) : nomeConsoleJogoOfertado = undefined
        typeof(nomeConsoleJogoDesejado) === 'string' ? nomeConsoleJogoDesejado = String(nomeConsoleJogoDesejado) : nomeConsoleJogoDesejado = undefined

        const exibeTrocas = container.resolve(ExibeTrocas);

        const trocas = await exibeTrocas.executar({
            idUser, 
            estado, 
            municipio, 
            nomeJogoDesejado, 
            nomeJogoOfertado, 
            nomeConsoleJogoOfertado, 
            nomeConsoleJogoDesejado
        });

        return response.status(200).json(classToClass(trocas));
    }

    public async exibirDoUsuario(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;

        const exibeTrocas = container.resolve(ExibeTrocasDeUmUsuario);

        const troca = await exibeTrocas.executar(idUser);

        return response.status(200).json(classToClass(troca));
    }

    public async desativar(request: Request, response: Response ):Promise<Response>{
        const idUser = request.user.id;
        const {idTroca} = request.params;

        const desativaTroca = container.resolve(DesativaTroca);

        await desativaTroca.executar({idUser, idTroca});

        return response.status(204).json();
    }
}