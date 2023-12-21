import { Router } from "express";
import fs from 'fs';
import crypto from 'crypto';

const cartsRouter = Router();
const CARTS_FILE = './src/public/carrito.json';

cartsRouter.get('/', (req, res) => {
  try {
      const productsData = fs.readFileSync(CARTS_FILE, 'utf8');
      const products = JSON.parse(productsData);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


cartsRouter.post('/', (req, res) => {
    const newCart = { id: crypto.randomUUID(), products: [] };
    try {
      const cartsData = fs.readFileSync(CARTS_FILE, 'utf8');
      const carts = JSON.parse(cartsData);
      carts.push(newCart);
      fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
      res.status(201).json(newCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    try {
      const cartsData = fs.readFileSync(CARTS_FILE, 'utf8');
      const carts = JSON.parse(cartsData);
      const cart = carts.find((c) => c.id === cartId);
      if (cart) {
        res.json(cart.products);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
  
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
  
    try {
      const cartsData = fs.readFileSync(CARTS_FILE, 'utf8');
      let carts = JSON.parse(cartsData);
      
      const cartIndex = carts.findIndex((c) => c.id === cartId);
  
      if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((p) => p.id === productId);
  
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }

        carts[cartIndex] = cart;
  
        fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
  
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default cartsRouter