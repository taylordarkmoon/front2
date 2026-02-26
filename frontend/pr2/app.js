const express = require("express");
const app = express();
const port = 3000;

let catalog = [
    { id: 1, title: "Ноутбук", price: 45000 },
    { id: 2, title: "Смартфон", price: 30000 },
    { id: 3, title: "Наушники", price: 4000 }
];

app.use(express.json());

// Все товары
app.get("/catalog", (req, res) => {
    res.json(catalog);
});

// Один товар
app.get("/catalog/:id", (req, res) => {
    const item = catalog.find(i => i.id == req.params.id);
    if (!item) return res.status(404).send("Нет");
    res.json(item);
});

// Добавить
app.post("/catalog", (req, res) => {
    const { title, price } = req.body;
    const newItem = {
        id: Date.now(),
        title,
        price
    };
    catalog.push(newItem);
    res.status(201).json(newItem);
});

// Обновить
app.patch("/catalog/:id", (req, res) => {
    const item = catalog.find(i => i.id == req.params.id);
    if (!item) return res.status(404).send("Нет");
    
    const { title, price } = req.body;
    if (title) item.title = title;
    if (price) item.price = price;
    
    res.json(item);
});

// Удалить
app.delete("/catalog/:id", (req, res) => {
    catalog = catalog.filter(i => i.id != req.params.id);
    res.send("Удалено");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}/catalog`);
});