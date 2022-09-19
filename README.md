# RepoProvas-API

# <p align = "center"> Projeto RepoProvas </p>

<p align = "center">
   <img src="https://github.com/LucasBrandaoGomes/RepoProvas-API/blob/d737880743d85a46126bc65d082c90f22f4709bb/img/drivenpass-logo.png" />
</p>

##  :clipboard: Descrição

Back-end da aplicação RepoProvas, que tem por finalidade a criação de um repositório de provas e a organização destas por periodos, disciplinas e professores.

Feramentas e tecnologias utilizadas: Heroku, PostgresSQL, TypeScript, Prisma, Node JS, EXPRESS, JWT
***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs/bcrypt
- Node.js
- TypeScript
- Postgres SQL
- Prisma 

***

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "Lorem ipsum",
        "password": "1234",
        "passwordConfirmation": "1234"
}
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "1234"
    }
```
```yml 
POST /tests (autenticada)
    - Rota para inserir novo registro de prova
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "nome": "Nome da prova",
    "pdfUrl": "https://loremisum..."
    "categorieId": 1,
    "disciplineId": 1,
    "teacherId": 1    
    }
```

```yml 
GET /tests/disciplines (autenticada)
    - Rota para listar todas as provas, sendo o agrupamentopor período e por disciplinas
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml 
GET /tests/teachers (autenticada)
    - Rota para listar todas as provas, sendo o agrupamentopor período e por professor
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
https://github.com/LucasBrandaoGomes/RepoProvas-API.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm start
```

