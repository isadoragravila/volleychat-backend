# <p align = "center"> VolleyChat back-end </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/102394075/194929187-4a1b3fde-336a-42d8-a741-3d701b625ee5.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-isadoragravila-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/isadoragravila/volleychat-backend?color=4dae71&style=flat-square" />
</p>

##  :clipboard: Descrição

Aplicação dedicada aos amantes do vôlei, com o intuito de conectar essas pessoas.

Nela, o usuário poderá interagir com os outros através de salas de bate-papo temáticas, criadas pelos próprios usuários. 

Está acontecendo um jogo neste momento? Crie uma sala e ou entre em uma para conversar sobre!

***

## :computer:	 Tecnologias e Conceitos

- Node.js
- TypeScript
- PostgreSQL
- Prisma
- JWTs

***

## :rocket: Rotas

### Rotas não autenticadas

- #### Rota: POST ```/sign-up```
    - **Função**: Registro de usuários;
    - **Request:** body no formato:
    ```json
    {
        "username": "mariasilva", //string
        "email": "maria@email.com", //string
        "password": "1234567890", //string (min 8 dígitos)
        "image": "https://thumbs.dreamstime.com/b/%C3%ADcone-no-estilo-liso-do-usu%C3%A1rio-da-pessoa-para-site-ilustra%C3%A7%C3%A3o-vetor-129831161.jpg", //string (url)
        "bio": "descrição sobre o usuário" //string
    }
    ```
    - StatusCodes:
        - 201: sucesso na criação;
        - 409: email ou username já cadastrado;
        - 422: erro no formato do body.

- #### Rota: POST ```/sign-in```
    - **Função**: Login de usuários;
    - **Request:** body no formato:
    ```json
    {
        "username": "mariasilva", //string (email)
        "password": "1234567890" //string (min 8 dígitos)
    }
    ```
    - **Retorno:**
    ```json
    {
        "userId": 1,
        "token": "$token" //token gerado por jwt
    }
    ```
    - StatusCodes:
        - 200: sucesso;
        - 401: email ou senha incorretos;
        - 422: erro no formato do body.

### Rotas autenticadas

Todas as rotas devem enviar um token de autenticação no formato:

    Headers: { "Authorization": "Bearer $token" }

- #### Rota: GET ```/categories```
    - **Função**: listar categorias;
    - **Retorno:**
    ```json
    [
        {
            "id": 1,
            "name": "women's volleyball"
        },
        {
            "id": 2,
            "name": "men's volleyball"
        },
        {
            "id": 3,
            "name": "women's beach volleyball"
        },
        {
            "id": 4,
            "name": "men's beach volleyball"
        }
    ]
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token).

- #### Rota: GET ```/profile```
    - **Função**: Envia informações de perfil do usuário logado;
    - **Retorno:**
    ```json
    {
        "id": 1,
        "username": "mariasilva", 
        "email": "maria@email.com", 
        "image": "https://thumbs.dreamstime.com/b/%C3%ADcone-no-estilo-liso-do-usu%C3%A1rio-da-pessoa-para-site-ilustra%C3%A7%C3%A3o-vetor-129831161.jpg",
        "bio": "descrição sobre o usuário" 
    }
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token).

- #### Rota: GET ```/profile/:id```
    - **Função**: Envia informações de perfil por id;
    - **Retorno:**
    ```json
    {
        "id": 1,
        "username": "mariasilva", 
        "image": "https://thumbs.dreamstime.com/b/%C3%ADcone-no-estilo-liso-do-usu%C3%A1rio-da-pessoa-para-site-ilustra%C3%A7%C3%A3o-vetor-129831161.jpg",
        "bio": "descrição sobre o usuário" 
    }
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou do id informado via params.


- #### Rota: POST ```/chats/create/:categoryId```
    - **Função**: Criação de salas de bate-papo;
    - **Request:** body no formato:
    ```json
        {
            "title": "Brasil x Itália",
            "description": "Chat aberto para discussão do jogo Brasil x Itália do mundial"
        }
    ```
    - **Retorno:**
    ```json

        {
            "id": 1,
            "title": "Brasil x Itália",
            "description": "Chat aberto para discussão do jogo Brasil x Itália do mundial",
            "private": false,
            "categoryId": 1,
            "creatorId": 1,
            "createdAt": "2022-10-05T20:56:16.871Z"
        }
    ```
    - **StatusCodes**:
        - 201: sucesso na criação;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou categoria não encontrada;
        - 422: erro no formato do body.

- #### Rota: GET ```/chats/:categoryId```
    - **Função**: Busca salas de bate-papo por categoria em ordem descendente de data de criação;
    - **Retorno:**
    ```json
        {
            "id": 1,
            "name": "women's volleyball",
            "chatrooms": [
                {
                    "id": 1,
                    "title": "Brasil x Itália",
                    "description": "Chat aberto para discussão do jogo Brasil x Itália do mundial",
                    "private": false,
                    "categoryId": 1,
                    "creatorId": 1,
                    "createdAt": "2022-10-05T20:56:16.871Z",
                    "fromNow": "a few seconds ago"
                }
            ]
        }
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou categoria não encontrada.
    - **OBS**: executa checagem de status das salas de bate-papo, removendo das salas usuários que não atualizaram seus status.

- #### Rota: GET ```/chats/creator/:creatorId```
    - **Função**: Busca salas de bate-papo por criador em ordem descendente de data de criação;
    - **Retorno:**
    ```json
        [
            {
                "id": 1,
                "title": "Brasil x Itália",
                "description": "Chat aberto para discussão do jogo Brasil x Itália do mundial",
                "private": false,
                "categoryId": 1,
                "creatorId": 1,
                "createdAt": "2022-10-05T20:56:16.871Z",
                "category": {
                    "name": "women's volleyball"
                }
            }
        ]
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou do id informado via params;
    - **OBS**: executa checagem de status das salas de bate-papo, removendo das salas usuários que não atualizaram seus status.

- #### Rota: POST ```/messages/:chatroomId```
    - **Função**: Envio de mensagens;
    - **Request:** body no formato:
    ```json
        {
            "content": "Olá!"
        }
    ```
    - **Retorno:**
    ```json
        {
            "id": 1,
            "content": "Olá",
            "chatroomId": 1,
            "userId": 1,
            "createdAt": "2022-10-05T22:28:18.413Z"
        }
    ```
    - **StatusCodes**:
        - 201: sucesso na criação;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou sala de bate-papo não encontrada;
        - 422: erro no formato do body.

- #### Rota: GET ```/messages/:chatroomId```
    - **Função**: Busca mensagens por sala de bate-papo em ordem descendente de data de criação;
    - **Retorno:**
    ```json
        {
            "userId": 1,
            "id": 1,
            "title": "Brasil x Itália",
            "messages": [
                {
                    "id": 2,
                    "content": "tudo bem",
                    "chatroomId": 1,
                    "userId": 1,
                    "createdAt": "2022-10-05T22:49:21.066Z",
                    "user": {
                        "username": "mariasilva"
                    }
                },
                {
                    "id": 1,
                    "content": "Olá",
                    "chatroomId": 1,
                    "userId": 1,
                    "createdAt": "2022-10-05T22:28:18.413Z",
                    "user": {
                        "username": "mariasilva"
                    }
                }
            ]
        }
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou sala de bate-papo não encontrada.

- #### Rota: POST ```/participants/:chatroomId```
    - **Função**: Insere usuário na sala de bate-papo;
    - **StatusCodes**:
        - 201: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou sala de bate-papo não encontrada;
        - 409: usuário já é um participante da sala.
    - **OBS**: executa checagem de status das salas de bate-papo, removendo das salas usuários que não atualizaram seus status.

- #### Rota: DELETE ```/participants/:chatroomId```
    - **Função**: Remove usuário da sala de bate-papo;
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou sala de bate-papo não encontrada;
        - 404: usuário não é um participante da sala.

- #### Rota: PATCH ```/participants/:chatroomId/status```
    - **Função**: Atualiza status do usuário, para mantê-lo logado na sala;
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou sala de bate-papo não encontrada;
        - 404: usuário não é um participante da sala.

- #### Rota: GET ```/participants/:chatroomId```
    - **Função**: Lista todos os participantes da sala de bate-papo;
    - **Retorno:**
    ```json
        [
            {
                "id": 1,
                "name": "mariasilva"
            },
            {
                "id": 2,
                "name": "joaosouza"
            }
        ]
    ```
    - **StatusCodes**:
        - 200: sucesso;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou sala de bate-papo não encontrada;
    - **OBS**: executa checagem de status das salas de bate-papo, removendo das salas usuários que não atualizaram seus status.

***
## 🏁 Rodando a aplicação

### **1. Localmente** (ambiente de desenvolvimento)

Certifique-se que você tenha a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório em sua máquina:

```
git clone https://github.com/isadoragravila/volleychat-backend.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependências:

```
npm install
```

Então, configure seus arquivos .env e .env.test, de acordo com o .env.example
```
PORT= porta em que a aplicação irá rodar no servidor
DATABASE_URL= postgres://YourUser:YourPassword@YourHost:5432/YourDatabase
JWT_SECRET= palavra segura para encriptação dos tokens
TOKEN_EXPIRES_IN= número equivalente ao tempo de expiração dos tokens (sugestão: 2592000 (1 mês em segundos))
NODE_ENV= "prod" ou "test"
```

Depois, dentro da pasta, rode o seguinte comando para migrar o banco de dados:

```
npm run prisma && npm run seed
```

Finalizado o processo, para inicializar o servidor, rode:
```
npm run dev
```
ou, para ambiente de testes:
```
npm run dev:test
```

### **2. Deploy**

Link do deploy no Heroku :
```
https://volleychat.herokuapp.com/
```

***

## **Rodando os Testes**

:stop_sign: Certifique-se de utilizar um arquivo .env.test e um banco de dados de testes para não comprometer o seu banco de dados original

### Testes de integração

Para rodar os testes de integração, abra o diretório no terminal e rode o seguinte comando:

```
npm run test:integration
```

### Testes unitários

Para rodar os testes unitários, abra o diretório no terminal e rode o seguinte comando:

```
npm run test:unit
```