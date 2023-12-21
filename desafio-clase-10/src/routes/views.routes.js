import { Router } from "express";
import {productManager} from "../classes/productManager.js";

const viewsRouter = Router();
const productManager = new productManager("productos.json");

viewsRouter.get("/product", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("productos", { products: products });
});


router.get("/realtime", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realtime", {
        title: "Productos en tiempo real",
        products: products,
        style: "css/products.css",
    });
});


export default viewsRouter