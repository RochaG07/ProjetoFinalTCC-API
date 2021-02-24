import MensagemChat from '@modules/trocas/infra/typeorm/entities/MensagemChat';
import express from 'express';

import { createServer } from 'http';
import { Server, Socket } from "socket.io";

interface IActiveUser {
  socketId: string,
  idUser: string
}

interface IUserInChat {
  socketId: string,
  nome: string,
  idNeg: string,
}

interface IChat {
  nomeusuario: string,
  idNeg: string,
}

interface IUsuariosDasNegsLogados {
  idUsuario: string,
  estaLogado: boolean,
}

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}}); 

//const mensagens: MensagemChat[] = [];

let usuarioLogado : IActiveUser | null = null;

let usuariosAtivos: IActiveUser[] = [];

//Variável que contém a lista de usuários em um chat 
let usuariosEmChat: IUserInChat[] = [];

//Variável que representa o usuário desse socket no chat
//estará null se o usuário não estiver no chat
let usuarioNoChat: IUserInChat | null;

io.on('connection', (socket: Socket) => {
  //console.log('Socket conectado:'+ socket.id);

  socket.on('login', (idUser: string) => {  

    usuarioLogado = {
      socketId: socket.id,
      idUser
    };

    usuariosAtivos.push(usuarioLogado);

    //console.log(usuariosAtivos);
  });

  socket.on('verificar se usuarios estao logados', (idsUsuario: string[]) => {  
    const usuariosDasNegsLogados: IUsuariosDasNegsLogados[] = [];
    
    idsUsuario.forEach(idUsuario => {
      let estaLogado = false;

      //Verifica se o id de usuário está na lista de usuários logados 
      usuariosAtivos.forEach(usuario => {
        if(usuario.idUser === idUsuario){
          estaLogado = true;
        }
      })
      
      usuariosDasNegsLogados.push({
        idUsuario,
        estaLogado
      })
    })
  
    socket.emit('lista de usuarios ativos das negociacoes', usuariosDasNegsLogados);
  });

  socket.on('disconnect', () => {
    //console.log('Socket desconectado:'+ socket.id);
    
    //const usuarioDesconectado = usuariosAtivos.find(usuario => (socket.id === usuario.socketId));

    console.log('disconnect');
    console.log(usuarioLogado);

    if(usuarioLogado){
      usuariosAtivos = usuariosAtivos.filter(usuario => (usuario !== usuarioLogado));

      console.log(usuariosAtivos);

      usuarioLogado = null;
    }
  });
})

const chat = io.of('/chat');

//const criarMensagem = container.resolve(CriaMensagemChatService);
//const exibeMensagens = container.resolve(ExibeMensagensChatDeUmaNegociacaoService);

chat.on('connection', (socket: Socket) => {
  //console.log('Socket chat conectado:'+ socket.id);

  socket.on('abrir chat', async(data: IChat) => {
    socket.join(data.idNeg);

    /*
    usuarioNoChat = {
      socketId: socket.id,
      idNegociacao: data.idNegociacao,
      nome: data.nomeUsuario
    }

    console.log(usuariosAtivos);

    usuariosEmChat.push(usuarioNoChat);

    //socket.emit('usuarios na sala', usuariosEmChat.filter(usuario => (usuario.idNegociacao === data.idNegociacao)));

    socket.to(data.idNegociacao).emit('usuario entrou', usuarioNoChat); 
    */
  });

  socket.on('fechar chat', (data: IChat) => {
    socket.leave(data.idNeg);

    /*
    if(usuarioNoChat){
      //Remove o usuário da lista de usuarios em chat
      usuariosEmChat = usuariosEmChat.filter(usuario => (
        usuario !== usuarioNoChat
      ));

      //Emite para os usuarios que estão na mesma sala
      //que o usuário que saiu
      socket.to(usuarioNoChat.idNegociacao).emit('usuario saiu', usuarioNoChat);

      usuarioNoChat = null;
    }
    */
  });

  socket.on('enviar mensagem', async(data: MensagemChat) => {
    socket.to(data.idNeg).emit('mensagem recebida', data);
  });

  socket.on('disconnect', () => {
    //console.log('Socket chat desconectado:'+ socket.id);
    /*
    if(usuarioNoChat){

      //Remove o usuário da lista de usuarios em chat
      usuariosEmChat = usuariosEmChat.filter(usuario => (
        usuario !== usuarioNoChat
      ));

      //Emite para os usuarios que estão na mesma sala
      //que o usuário que saiu
      socket.to(usuarioNoChat.idNegociacao).emit('usuario saiu', usuarioNoChat);

      usuarioNoChat = null;
    }
    */
  });


});


export default server;