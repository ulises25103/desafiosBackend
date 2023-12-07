import { ProductManager } from "./productManager.js";


let miPrimeraTienda = new ProductManager("products.json");

    miPrimeraTienda.addProduct("pan", "pan", 2, "url", "pan", 5);
    miPrimeraTienda.addProduct("leche", "leche", 3, "url", "leche", 6);
    miPrimeraTienda.addProduct("azucar", "azucar", 4, "url", "azucar", 7);
