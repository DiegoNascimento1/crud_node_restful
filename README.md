# Node.js CRUD API

Esta é uma simples API RESTful de CRUD (Create, Read, Update, Delete) desenvolvida em Node.js utilizando o framework Express. A aplicação simula um banco de dados usando um array para armazenar os itens.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina.

## Instalação

1. Clone este repositório ou baixe o código-fonte.

2. Na pasta raiz do projeto, execute o seguinte comando para instalar as dependências:
```shell
npm install
```

## Uso

1. Inicie o servidor executando o seguinte comando:

```shell
node index.js
```

A API estará disponível em `http://localhost:3000`.

2. Use ferramentas como Postman ou cURL para testar as diferentes rotas de CRUD:

- **Incluir um produto:** `POST /produtos`
- **Obter a lista de produtos:** `GET /produtos`
- **Obter um produto específico:** `GET /produtos/:id`
- **Alterar um produto:** `PUT /produtos/:id`
- **Excluir um produto:** `DELETE /produtos/:id`

## Exemplo de Objeto

Os itens são representados como objetos JSON com a seguinte estrutura:

```json
{
"id": 1,
"descricao": "Arroz parboilizado 5Kg", 
"valor": 25.00, 
"marca": "Tio João"
}