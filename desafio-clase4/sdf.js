const fs = require('fs')

class ProductManager {

    constructor(ruta) {
        //En lugar de utilizar this.path utilizo ruta
        this.ruta = ruta
    }

    async ObtenerPoductos() {
        if (fs.existsSync(this.ruta)) { //Si el archivo existe
            const ProductosGuardados = await fs.promises.readFile(this.ruta,'utf-8') //Leo el archivo
            return JSON.parse(ProductosGuardados) //Parseo la lectura a string JS
        } else {
            return [] 
        }
    }

    async AgregarProducto(producto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        let id
        if (!ProductosGuardados.length) {
            id = 1
        } else {
            id = ProductosGuardados[ProductosGuardados.length-1].id+1
        }
        ProductosGuardados.push({id,...producto})
        await fs.promises.writeFile(this.ruta,JSON.stringify(ProductosGuardados))
        console.log('Producto cargado')
    }

    async EditarProducto(IDProducto,CampoAActualizar,NuevoDato){
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProductoAActualizar = ProductosGuardados.find(u=>u.id === IDProducto)
        if (ProductoAActualizar) {
            ProductoAActualizar[CampoAActualizar] = NuevoDato
            await fs.promises.writeFile(this.ruta,JSON.stringify(ProductosGuardados))
        } else {
          return 'Producto no ecnontrado'  
        }
    }

    async BorrarProductoPorID(IDProducto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProductosGuardadosAux = ProductosGuardados.filter(u=>u.id !== IDProducto)
        await fs.promises.writeFile(this.ruta, JSON.stringify(ProductosGuardadosAux))
    }

    async ObtenerProductoPorID(IDProducto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProdAux = ProductosGuardados.find(u=>u.id === IDProducto)
        if (ProdAux) {
            return ProdAux
        } else {
            return 'Porducto no encontrado'
        }
    }

    async BorrarArchivo(){
        await fs.promises.unlink(this.ruta)
    }
}

//Instancio productos
const Producto1 = {
    titulo: "Talco",
    descripcion: "Polvo para pies",
    precio: 10,
    imagen: "Sin imagen",
    codigo: "AAA001",
    stock: 10
}
const Producto2 = {
    titulo: "Leche",
    descripcion: "Leche entera",
    precio: 15,
    imagen: "Sin imagen",
    codigo: "AAA002",
    stock: 15
}
const Producto3 = {
    titulo: "Café",
    descripcion: "Café torrado",
    precio: 20,
    imagen: "Sin imagen",
    codigo: "AAA003",
    stock: 20
}
const Producto4 = {
    titulo: "Mate cocido",
    descripcion: "En saquitos",
    precio: 25,
    imagen: "Sin imagen",
    codigo: "AAA004",
    stock: 25
}

const ruta = './productos.json'
async function test(){
    const PM = new ProductManager(ruta)
    await PM.AgregarProducto(Producto1)
    await PM.AgregarProducto(Producto2)
    await PM.AgregarProducto(Producto3)
    await PM.AgregarProducto(Producto4)
    console.log('---------- Obtener productos ----------')
    const aux1 = await PM.ObtenerPoductos()
    console.log(aux1);
    console.log('---------- Obtener producto por ID, el 3 ----------')
    const aux2 = await PM.ObtenerProductoPorID(3)
    console.log(aux2);
    console.log('---------- Borrar un producto, el 2 ----------')
    await PM.BorrarProductoPorID(2)
    const aux3 = await PM.ObtenerPoductos()
    console.log(aux3);
    console.log('---------- Editar un producto, el 4 ----------')
    await PM.EditarProducto(4,'codigo','pppppp')
    const aux4 = await PM.ObtenerPoductos()
    console.log(aux4);
    console.log('---------- Borro archivo ----------')
    await PM.BorrarArchivo()
}
test()