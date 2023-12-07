class ProductManager {
    constructor() {
      this.products = [];
      this.id = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (title && description && price && thumbnail && code && stock) {
        const verificationCode = this.products.some(product => product.code === code);
  
        if (verificationCode) {
          console.error("Código Repetido");
        } else {
          const newProduct = { id: this.generateId(), title, description, price, thumbnail, code, stock };
          this.products.push(newProduct);
          console.log("Producto agregado:", newProduct);
        }
      } else {
        console.error("Por favor completar todos los campos");
      }
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (!product) {
        console.error("Not Found");
      } else {
        console.log("El producto solicitado es:", product);
      }
    }
  
    generateId() {
      return this.id++;
    }
  }
  
  const manager = new ProductManager();
  
  manager.addProduct("Producto 1", "Descripción 1", 19.99, "imagen1.jpg", "001", 50);
  manager.addProduct("Producto 2", "Descripción 2", 29.99, "imagen2.jpg", "002", 30);
  
  const allProducts = manager.getProducts();
  console.log("Todos los productos:", allProducts);
  
  const productById = manager.getProductById(allProducts[0].id);
  console.log("Producto por ID:", productById);