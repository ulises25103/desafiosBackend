import express from "express"

import {ProductManager}  from "./productManager.js"


const app = express()
const PORT = 8080;


const productManager = new ProductManager ("products.json");


let products = [
    {
        name: "Escuadra",
        price: 123.45,
        id: 1
    },
    {
        name: "Calculadora",
        price: 234.56,
        id: 2
    },
    {
        name: "Globo Terraqueo",
        price: 345.67,
        id: 3
    },
    {
        name: "Destornillador",
        price: 456.78,
        id: 4
    },
    {
        name: "Escuadra",
        price: 567.89,
        id: 5
    }
]


app.get("/", (req, res) => {
    res.send("Hello World!")
})


app.get("/products", (req, res) => {
    let temporalProducts = products;
    const { limit } = req.query;
    if (limit) {
        temporalProducts = temporalProducts.slice(0, +limit); 
    }

    res.json({
        msg:"Lista de productos",
        data: temporalProducts
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})


