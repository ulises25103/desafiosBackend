import { Router } from "express";
const productsRouter = Router();
import { ProductManager } from "../classes/productManager.js";


const PRODUCTS_FILE = '../src/public/productos.json';
const productManager = new ProductManager(PRODUCTS_FILE);

productsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

productsRouter.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
      const product = await productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

productsRouter.post('/', async(req, res) => {
    const {
        title,
        description,
        code,
        price,
        status = true, 
        stock,
        category,
        thumbnails = [], 
      } = req.body;

    
      try {
        await productManager.addProduct( title, description, code, price, status, stock, category, thumbnails);
        res.status(201).json({ message: 'Product added successfully' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      };
    }

);



productsRouter.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    try {
      const result = await productManager.updateProductById(productId, updatedProduct);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Internal Server Error' });
    }
});
  

productsRouter.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const result = await productManager.deleteProductById(productId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Internal Server Error' });
  }
  });


export default productsRouter;