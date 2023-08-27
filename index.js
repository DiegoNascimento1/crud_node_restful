const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulando um banco de dados com um array
let data = [];

// Rotas para CRUD

// Criar um novo item
app.post("/items", (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Obter todos os itens
app.get("/items", (req, res) => {
  res.json(data);
});

// Obter um item por ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Atualizar um item por ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Deletar um item por ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Tratar rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
