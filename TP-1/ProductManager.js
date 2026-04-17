class ProductManager {
    constructor(path) {
        this.productos = []
        this.path = path
    }


    async addProduct(nombre, descripcion, precio, stock) {
        if (!nombre || !descripcion || !precio || !stock === undefined) {
            console.error("Error: Todos los campos son obligatorios.");
            return;
        }
        const id = this.productos.length + 1
        const producto = { id, nombre, descripcion, precio, stock }
        this.productos.push(producto)
    }

    getProducts() {
        return this.productos
    }

    getProductoById(id) {
        const producto = this.productos.find(p => p.id === id)
        if (!producto) {
            console.log(`Producto con ID ${id} no encontrado.`)
            return null
        }
        return producto
    }

    // TP-3
    async leerProductosDelJson() {
        try {
            const data = await fs.readFile(this.path, "utf-8")
            this.productos = JSON.parse(data)
        } catch (error) {
            console.error("Error al leer el archivo:", error)
        }
    }

    async agregarProductoAlJson() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.productos, null, 2))
        } catch (error) {
            console.error("Error al escribir el archivo:", error)
        }
    }

    async deleteProductById(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index === -1) {
            console.error("not found");
            return;
        }
        this.productos.splice(index, 1);
        await this.agregarProductoAlJson();
    }

    async updateProductById(id, productUpdate) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index === -1) {
            console.error("not found");
            return;
        }
        this.productos[index] = { ...this.productos[index], ...productUpdate };
        await this.agregarProductoAlJson();
    }

}

export default ProductManager;