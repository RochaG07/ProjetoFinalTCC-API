## Indice

- [Sobre](#-sobre)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Modelo entidade-relacionamento](#-modelo-entidade-relacionamento)
- [Diagrama de classes](#-diagrama-de-classes)
- [Processos de negócio](#-processos-de-negócio)
- [Endpoints da API](#-endpoints-da-API)
- [Como baixar o projeto](#-como-baixar-o-projeto)

---

## Sobre

O projeto foi desenvolvido para o projeto final da Faculdades Integradas Simonsen. 
Essa parte é referente ao backend do projeto, para o frontend juntamente com a explicação do projeto clique [aqui](https://github.com/RochaG07/ProjetoFinalTCC-WEB).

---

## Tecnologias utilizadas

O backend do projeto foi desenvolvido utilizando as seguintes tecnologias:

- NodeJs
- Typescript
- TypeORM
- Express
- Multer
- Redis
- JSON Web Token
- Stripe
- Socket.io

---

## Modelo entidade-relacionamento

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-API/master/media/ModeloBanco_v9.jpg'>

---

## Diagrama de classes

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-API/master/media/DiagramaDeClassAtualizado.jpg'>

---

## Processos de negócio

<img src='https://raw.githubusercontent.com/ProjetoFinalTCC-API/master/media/Processos_de_negócio_v2.jpg'>

---

## Endpoints da API

- Módulo usuário

*/usuarios:* POST | Criação de uma nova conta
```json
{
    "name": "user1",
    "email": "user1@teste.com",
    "password": 123456
}
```

*/usuarios/avatar:* PATCH | 
```multipart/form-data
{
    // Multipart Form
    avatar | jpg. png.
}
```

*/usuarios/avisos:* GET | Exibe avisos do usuário



*/perfil:* GET | Exibe perfil

*/perfil:* PUT | Atualização do perfil
```json
{

	"nome": "nomeDoUsuario1",
	"email": "usuaric1@user.com" ,
	"senha_antiga": "123456",
	"senha": "123",
	"telefone": "123456456",
	"municipio": "municipio123",
	"estado": "estado123"
}
```

*/sessoes:* POST | Início de uma nova sessão
```json
{
    "username": "user1",
    "senha": 123456
}
```

*/senhas/esqueci* POST | Envia o token de recuperação de senha para o email
```json
{
	"email": "fansjdfnaskjdfnjkans@gmail.com"
}
```

*/senhas/resetar-senha:* POST | Reseta a senha
```json
{
    "token": "5ff936d0-584c-433b-a101-ff9fd74de43c",
	"senha": "123456",
	"senha_confirmacao": "123456"
}
```

- Módulo Administrador
*/admin* POST | Atribui status de admin para um usuário
```json
{
	"username": "usuario2"
}
```

*/admin* GET | Retorna um admin e suas respectivas permissões

*/admin/:username* DELETE | Remove status de admin de um usuário

*/admin/permissoes* POST | Adicionar permissão para um admin
```json
{
	"nomeAdmRecebedorDaPermissao": "usuario2",
	"permissoes": ["enviar_avisos"]
}
```

*/admin/avisos* POST | Enviar aviso
```json
{
	"username": "usuario5",
	"titulo": "kasmdk",
	"conteudo": "sdfbvff"
}
```

- Módulo jogo

*/jogos* POST | Cadastrar jogo
```multipart/form-data
{
	nome: jogo1,
	capa: capaJogo1.jpg,
	consoles[0]: console1,
	consoles[1]: console2,
}
```
*/jogos* GET | Exibir jogos

*/jogos/:idJogo* DELETE | Deletar jogo

*/jogos/consoles* POST | Cadastrar console
```json
{
	"nome": "console6"
}
```

*/jogos/consoles* GET | Exibir consoles

*/jogos/consoles/:idConsole* DELETE | Deleta console

- Módulo troca

*/trocas* POST | Criar troca
```json
{
	"descricao": "troca do user5",
	"idJogoOfertado": "bc8ed187-6844-4def-bd2a-cca111341afe",
	"idJogoDesejado": "033862ff-dade-436b-97e4-668b6e4728e9",
	"consoleJogoDesejado": "console1",
	"consoleJogoOfertado": "console2"
}
```
*/trocas?nomeJogoOfertado=Jogo B&estado=Amapá* GET | Exibe trocas disponíveis, com ou sem filtro

*/trocas/proprias* GET | Exibe trocas próprias

*/trocas/:idTroca* DELETE | Desativa troca

*/trocas/convites* POST | Envia convite para a troca
```json
{
	"mensagem": "asdasces",
	"idTroca": "f1ad1e2b-6fc7-44c6-a02c-d235cd6197c7"	
}
```

*/trocas/convites* GET | Exibe convites de uma troca

*/trocas/convites* PUT | Responde ao convite
```json
{
	"idConvite": "db198696-859f-4c5a-8518-df43c77397f6",
	"respostaAoConvite": "aceitar"
}
```
*trocas/negociacoes* GET | Exibir negociações de um usuário

*trocas/negociacoes/:idNegociacao* DELETE | Desativa a negociação

*trocas/mensagemChat/:idNegociacao* GET | Exibir mensagens de chat de uma negociação

---

## Como baixar o projeto

```jsx
#Clonar o repositório
$ git clone https://github.com/RochaG07/ProjetoFinalTCC-API.git

#Instalar as dependências
$ yarn add

#Monta o banco de dados
$ yarn typeorm:migration run

#Iniciar a API em modo de desenvolvimento
$ yarn dev:server
```