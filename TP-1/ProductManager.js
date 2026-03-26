class ProductManager{
    constructor(){
        this.productos = []
    }
    
    addProduct(nombre, descripcion, precio, stock){
        if (!nombre || !descripcion || !precio || !stock === undefined) {
            console.error("Error: Todos los campos son obligatorios.");
            return;
        }
        const id = this.productos.length + 1
        const producto = { id, nombre, descripcion, precio, stock }
        this.productos.push(producto)
    }

    getProducts(){
        return this.productos
    }

    getProductoById(id){
        const producto = this.productos.find(p=>p.id===id)
        if(!producto){
            console.log(`Producto con ID ${id} no encontrado.`)
            return null 
        }
        return producto
    }
}

export default ProductManager;