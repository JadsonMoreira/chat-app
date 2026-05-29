# Chat App

Aplicação de chat em tempo real com autenticação JWT, construída com **Fastify** no backend e **React** no frontend, utilizando **Socket.io** para comunicação em tempo real e **MongoDB** como banco de dados.

## Tecnologias

### Backend
- Fastify
- Socket.io
- MongoDB + Mongoose
- JWT (@fastify/jwt)
- bcrypt
- Swagger
- TypeScript

### Frontend
- React 18 + TypeScript
- Vite
- Socket.io Client
- Axios
- jwt-decode

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Criação de chats entre usuários
- Envio e recebimento de mensagens em tempo real via Socket.io
- Listagem de conversas do usuário
- Documentação da API via Swagger em `/docs`

## Estrutura do Projeto

```
chat-app/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── routers/
│       ├── collections/
│       ├── configs/
│       └── socket/
└── frontend/
    └── src/
        ├── components/
        └── services/
```

## Como rodar

### Pré-requisitos
- Node.js 18+
- MongoDB rodando localmente ou URI de conexão

### Backend

```bash
cd chat-app/backend
yarn install
# crie um arquivo .env com PORT, MONGO_URI e JWT_SECRET
yarn dev
```

A API ficará disponível em `http://localhost:3000`  
Documentação Swagger: `http://localhost:3000/docs`

### Frontend

```bash
cd chat-app/frontend
yarn install
yarn dev
```

## Variáveis de Ambiente (backend)

| Variável     | Descrição                        |
|--------------|----------------------------------|
| PORT         | Porta do servidor (padrão: 3000) |
| MONGO_URI    | URI de conexão com o MongoDB     |
| JWT_SECRET   | Segredo para tokens JWT          |

---
