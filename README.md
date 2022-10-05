# <p align = "center"> VolleyChat back-end </p>

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
        "token": "$token" //token gerado por jwt
    }
    ```
    - StatusCodes:
        - 200: sucesso;
        - 401: email ou senha incorretos;
        - 422: erro no formato do body.

### Rotas autenticadas

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
            "createdAt": "2022-10-05T20:56:16.871Z",
            "fromNow": "a few seconds ago"
        }
    ```
    - **StatusCodes**:
        - 201: sucesso na criação;
        - 401: token inválido;
        - 404: usuário não encontrado (verificação do token) ou categoria não encontrada;
        - 422: erro no formato do body.

- #### Rota: GET ```/chats/:categoryId```
    - **Função**: Busca salas de bate-papo por categoria;
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
        - 404: usuário não encontrado (verificação do token).

***
## 🏁 Rodando a aplicação

### **Localmente** (ambiente de desenvolvimento)

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
npx prisma migrate dev && db seed
```

Finalizado o processo, para inicializar o servidor, rode:
```
npm run dev
```
ou, para ambiente de testes
```
npm run dev:test
```

:stop_sign: Certifique-se de utilizar um arquivo .env.test e um banco de dados de testes para não comprometer o seu banco de dados original
