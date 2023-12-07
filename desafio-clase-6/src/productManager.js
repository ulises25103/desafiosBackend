import utils from "./utils.js";

export class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = utils.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
      this.saveProducts();
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    utils.writeFile(this.path, data, 'utf8');
  }

  addProduct(product) {
    const productId = this.products.length + 1;
    const newProduct = { id: productId, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }


  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}

const productManager = new ProductManager('products.json');

const productToAdd = {
  title: 'Producto de ejemplo',
  description: 'Descripción del producto',
  price: 19.99,
  thumbnail: 'ruta/imagen.jpg',
  code: 'ABC123',
  stock: 10,
};

const addedProduct = productManager.addProduct(productToAdd);
console.log('Producto agregado:', addedProduct);

const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(`Producto con ID ${productIdToFind}:`, foundProduct);

const productIdToUpdate = 1;
const updatedFields = { price: 24.99, stock: 15 };
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields);
console.log('Producto actualizado:', updatedProduct);

const productIdToDelete = 1;
const deletedProduct = productManager.deleteProduct(productIdToDelete);
console.log('Producto eliminado:', deletedProduct);