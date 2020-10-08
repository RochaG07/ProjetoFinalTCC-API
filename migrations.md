
# Migrations
**Tabelas**
CreateUsuarios
CreateAdministradores
CreateAvisos
CreateConvites
CreateTrocas
CreateJogos
CreateConsoles
CreateNegociacoes
CreateMensagensChat
CreateTrocas_Jogos
CreateJogos_Consoles
CreatePlanos
CreatePagamentos
CreateUsuarios_Planos
CreateTokenUsuarios

**Relacionamentos**

AddIdUserToTrocas

AddIdTrocaToConvites
AddIdUser_solicitadorToConvites
AddIdUser_criadorTrocaToConvites

AddIdAdmToAvisos
AddIdUserToAvisos

AddIdTrocaToNegociacoes
AddIdUserToNegociacoes
AddIdUser_criadorTrocaToNegociacoes

AddIdNegToMensagensChat

AddIdTrocaToTrocas_Jogos
AddIdJogoToTrocas_Jogos

AddIdJogoToJogos_Consoles
AddIdConsoleToJogos_Consoles

AddIdUserToPagamentos

AddIdAdmToJogos

AddIdUserToUsuarios_Planos
AddIdPlanoToUsuarios_Planos

AddIdUserToTokenUsuarios

AddIdUserToAdministradores

**Queries**

INSERT INTO usuarios VALUES(default, 'usuario1', '123', 'usuario1@gmail.com', default, 'User1', '121231' )

INSERT INTO administradores VALUES(default, 'adm1', 'adm1@gmail.com', '123', 3, default)

INSERT INTO planos VALUES
(default, 'gratuito', 0, false),
(default, 'premium', 10, true)

INSERT INTO usuarios_planos VALUES(default, null ,'id de usuário', 'id de plano')

INSERT INTO consoles VALUES
(default, 'Xbox 420'),
(default, 'teisteichon 2'),

INSERT INTO jogos VALUES(default, 'aaaa', 'id de adm')

INSERT INTO jogos_consoles VALUES('id de jogo', 'id de console')

INSERT INTO trocas VALUES(default, 'descricao da troca', default, default, 'id de usuário')

INSERT INTO trocas_jogos VALUES('id de troca', 'id de jogo')

INSERT INTO negociacoes VALUES(default, default, default, 'id de troca', 'id de usuario')

INSERT INTO mensagenschat VALUES('conteudo da mensagem', default, 'id de negociacao') *não testada*

INSERT INTO avisos VALUES(default, 'sdasd', 'asdvcad', default, 'id de adm', 'id de usuario')

INSERT INTO convites VALUES(default, 'vfvf', 'jyjf', default, 'id de troca', 'id de usuario')

INSERT INTO jogos VALUES
(default, 'jogo1', '82507718-8d36-4671-a566-db7b2f457365'),
(default, 'jogo2', '82507718-8d36-4671-a566-db7b2f457365')