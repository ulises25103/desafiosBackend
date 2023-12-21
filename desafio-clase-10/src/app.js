import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import { productManager } from "./classes/productManager.js";


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);



const server = app.listen(port, () => {
    console.log(`servidor express escuchando en el puerto http://localhost:${port}`);
});

const socketServer = new Server(server)

socketServer.on("connection", (socket) => {
    console.log("nuevo cliente conectado");
    socket.on("addProduct", async (product) => {
        const title = product.title;
        const description = product.description;
        const price = product.price;
        const thumbnail = product.thumbnail;
        const code = product.code;
        const stock = product.stock;
    try {
        const result = await productManager.addProduct(
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        );
        const allProducts = await productManager.getProducts();
        console.log(allProducts);
        result && socketServer.emit("updateProducts", allProducts);
      } catch (err) {
        console.log(err);
      }
    });
  
    socket.on("deleteProduct", async (id) => {
      console.log(id);
      try {
        const result = await productManager.deleteProductById(id);
        const allProducts = await productManager.getProducts();
        console.log(allProducts);
        result && socketServer.emit("updateProducts", allProducts);
      } catch (err) {
        console.log(err);
      }
    });
  });


