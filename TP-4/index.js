import express from 'express'
import { ProductManager } from "./TP-1/ProductManager";

const app = express();
const PORT = 8080;

const productManager = new ProductManager('./TP-1/productos.json');

app.get('api/products', async (req, res) => {
    try{
        let data = await productManager.getProducts();
        console.log(data);

    }catch('error', (err)){
        console.error('Error: ' + err.menssage)
    }
})

app.get('api/products/id', async (req, res) => {
    try{
        let data = await productManager.getProductoById();
        console.log(data);
    }catch('error, (err)'){
        console.error('Error: ' + err.menssage)
    }
})