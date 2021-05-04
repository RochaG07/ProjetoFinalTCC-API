import MensagemChat from '@modules/trocas/infra/typeorm/entities/MensagemChat';
import express from 'express';

import { createServer } from 'http';
import { Server, Socket } from "socket.io";

interface IActiveUser {
  socketId: string,
  idUser: string,
  nome: string
  presenteNaSala: string | null,
}

interface IChat {
  nome: string,
  idNeg: string,
}

interface IGerarNotificacao {
  id: string,
  idUserAlvo: string, 
  conteudo: string
}

interface IGerarAviso {
  id: string,
  idUserAlvo: string, 
  titulo: string, 
  conteudo: string
}
interface ILogin{
  idUser: string,
  nome: string
}

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}}); 

let usuariosLogados: IActiveUser[] = [];

io.on('connection', (socket: Socket) => {
  let usuarioLogado : IActiveUser | null = null;

  socket.on('login', ({idUser, nome}: ILogin) => {  
    usuarioLogado = {
      socketId: socket.id,
      presenteNaSala: null,
      nome,
      idUser,
    };

    usuariosLogados.push(usuarioLogado);
  });

  ///Notificações
  socket.on('apresentar nova notificacao', ({id, idUserAlvo, conteudo}: IGerarNotificacao) => {
    const usuarioAlvo =  usuariosLogados.find(usuario => (idUserAlvo === usuario.idUser));

    if(usuarioAlvo){
      socket.to(usuarioAlvo.socketId).emit('enviar notificacao', {id, conteudo});
    }
  });

  ///Avisos
  socket.on('apresentar novo aviso', ({id, idUserAlvo, titulo, conteudo}: IGerarAviso) => {
    const usuarioAlvo =  usuariosLogados.find(usuario => (idUserAlvo === usuario.idUser));

    if(usuarioAlvo){
      socket.to(usuarioAlvo.socketId).emit('enviar aviso', {id, titulo, conteudo});
    }
  });

  ///Chat
  socket.on('abrir chat', async({ nome, idNeg}: IChat) => {
    socket.join(idNeg);

    if(usuarioLogado){
      usuariosLogados = usuariosLogados.filter(usuario => (usuario !== usuarioLogado));

      usuarioLogado = {
        ...usuarioLogado,
        presenteNaSala: idNeg,
      };

      usuariosLogados.push(usuarioLogado);
        
      const usuariosFiltrados = usuariosLogados.filter(usuario => (
        usuario.presenteNaSala === idNeg
      ));     

      socket.emit('usuarios na sala', usuariosFiltrados);

      socket.to(idNeg).emit('add nome do usuario na sala', {
        nome, 
        socketId: usuarioLogado.socketId
      });
    }
  });

  socket.on('fechar chat', ({nome, idNeg}: IChat) => {
    socket.leave(idNeg);

    if(usuarioLogado){
      usuariosLogados = usuariosLogados.filter(usuario => (usuario !== usuarioLogado));

      usuarioLogado = {
        ...usuarioLogado,
        presenteNaSala: null,
      };

      usuariosLogados.push(usuarioLogado);

      socket.to(idNeg).emit('remove nome do usuario na sala', {
        nome, 
        socketId: usuarioLogado.socketId
      });
    }
  });

  socket.on('enviar mensagem', async(data: MensagemChat) => {
    socket.to(data.idNeg).emit('mensagem recebida', data);
  });

  socket.on('disconnect', () => {
    if(usuarioLogado){
      usuariosLogados = usuariosLogados.filter(usuario => (usuario !== usuarioLogado));

      usuarioLogado = null;
    }
  });

})

export default server;