# Desafio | Back-end - Módulo 3 | Cubos Academy

## Desafio aplicado pela Cubos Academy referente ao módulo 3 do curso:

- SQL: Tabelas, Relações, Comandos.
- Node: Utilizando SQL no Node.
- Autenticação e Criptografia.

## O objetivo foi desenvolver uma API REST para o controle de finanças pessoais que permita:

- Cadastrar Usuário
- Fazer Login 
- Detalhar Perfil do Usuário Logado 
- Editar Perfil do Usuário Logado 
- Listar categorias 
- Listar transações 
- Detalhar transação 
- Cadastrar transação 
- Editar transação 
- Remover transação 
- Obter extrato de transações 
- Filtrar transações por categoria 
---
### **Cadastrar usuário**
#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) possui um objeto com as seguintes propriedades:

  - nome
  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Validação dos campos obrigatórios:
    - nome
    - email
    - senha
  - Validação se o e-mail informado já existe
  - Senha criptografada antes de persistir no banco de dados
  - Cadastro do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
{
    "mensagem": "E-mail ou senha inválidos!"
}
```
---
### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) possui um objeto com as seguintes propriedades:

  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) um objeto com a propriedade **token** que possui como valor o token de autenticação gerado e uma propriedade **usuario** que possui as informações do usuário autenticado, exceto a senha do usuário.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Validação dos campos obrigatórios:
    - email
    - senha
  - Validação se o e-mail existe
  - Validação do e-mail e senha
  - Criação do token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
{
    "mensagem": "E-mail ou senha inválidos!"
}
```
---
## **ATENÇÃO**: Todas os endpoints a seguir, a partir desse ponto, será exigido o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.
---
### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário será identificado através do ID presente no token de autenticação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não possui conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.  

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
{
    "mensagem": "Não autorizado!"
}
```
---
### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio cadastro.  

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) possui um objeto com as seguintes propriedades:

  - nome
  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

  - Validação dos campos obrigatórios:
    - nome
    - email
    - senha
  - Validação se o novo e-mail já existe no banco de dados para outro usuário
    - Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não será permitida (o campo de email é único no banco de dados)
  - Senha criptografada antes de salvar no banco de dados
  - Atualização das informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
---

---
### **Listar categorias**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não possui conteúdo no corpo (body) da requisição.

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) um array dos objetos (categorias) encontrados.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
[]
```
---
### **Listar transações do usuário logado**

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.  

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta irá possuir um array dos objetos (transações) encontrados.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um valor um texto explicando o motivo da falha.

  - O usuário será identificado através do ID presente no token de validação
  - O endpoint irá responder com um array de todas as transações associadas ao usuário. Caso não exista nenhuma transação associada ao usuário irá responder com array vazio.

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
[]
```
---
### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.  

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da irá deverá possuir um objeto que representa a transação encontrada, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Validação se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
{
    "mensagem": "Transação não encontrada."
}
```
---
### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.  

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição possui um objeto com as seguintes propriedades:

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**
    Em caso de **sucesso**, será enviado no corpo (body) da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Validação os campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validação se existe categoria para o id enviado no corpo (body) da requisição.
  - Validação se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Cadastrar a transação associada ao usuário logado.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
{
    "mensagem": "Todos os campos obrigatórios devem ser informados!"
}
```
---
### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.  

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição possui um objeto com as seguintes propriedades:

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Validação se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Validação dos campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validação se existe categoria para o id enviado no corpo (body) da requisição.
  - Validação se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Atualizar a transação no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
 "descricao": "Sapato",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
---
### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Validação se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "mensagem": "Transação não encontrada!"
}
```
---
### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
    Em caso de **falha na validação**, a resposta irá possuir **_status code_** apropriado, e em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

  - Em caso de não existir transações do tipo `entrada` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta será 0.
  - Em caso de não existir transações do tipo `saida` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta será 0.

#### **Exemplo de requisição**

```javascript
// GET /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
 "entrada": 300000,
 "saida": 15800
}
```
