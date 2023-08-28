const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const showdown = require('showdown');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulando um banco de dados com um array
let data = [];
let id = 1;

function validaBody(params, body) {
  let valid = [];
  Object.keys(params).map((i) => {
    console.log(i);
    valid.push("Aqui");
  });
  return valid;
}

// Rotas para CRUD

// Criar um novo item
app.post("/produtos", (req, res) => {
  req.body.id = id++;
  // const newItem = req.body;
  // params = {
  //   descricao: "string",
  //   valor: "number",
  //   marca: "string",
  // };
  // console.log(validaBody(params, newItem));
  // if (validaBody(params, newItem).length > 0) {

  // }
  const payload = {
    id: req.body.id,
    descricao: req.body.descricao,
    valor: req.body.valor,
    marca: req.body.marca,
  };
  // const item = newItem.valor;
//   console.log(Object(params));
//   console.log(Object(payload));
  //   console.log(Object.keys(newItem));return;
  //   console.log(validaBody(req));  return;

  data.push(payload);
  let response = {
    mensagem: "Sucesso",
    produtos: payload,
  };
  res.status(201).json(response);
});

// Obter todos os itens
app.get("/produtos", (req, res) => {
  let response = {
    mensagem: "Sucesso",
    produtos: data,
  };
  res.json(response);
});

// Obter um item por ID
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado!" });
  }
});

// Atualizar um item por ID
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado!" });
  }
});

// Deletar um item por ID
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado!" });
  }
});

// Rota de instruções
app.get('/', (req, res) => {
  fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler o arquivo README.md');
    }
    const converter = new showdown.Converter();
    const html = converter.makeHtml(data);
    res.send(html);
  });
});

// Tratar rotas não encontradas
app.use((req, res, next) => {
  res
    .status(400)
    .json({
      mensagem: "Solicitação incorreta que o servidor não pode processar",
    });
});

// Tratativa de erro 500 (Erro interno do servidor)
app.use((err, req, res, next) => {
  console.error("Erro interno:", err.message);
  res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor." });
});

// Iniciando servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
