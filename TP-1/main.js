import ProductManager from "./ProductManager.js";

const manager = new ProductManager()

manager.addProduct("gorrito", "chiquito", 10, 5)
manager.addProduct("campera", "grande", 20, 6)

console.log(manager.getProducts())

console.log(manager.getProductoById(1))
console.log(manager.getProductoById(10))