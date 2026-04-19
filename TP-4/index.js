import express from 'express'
import { ProductManager } from "./TP-1/ProductManager";

const app = express();
const PORT = 8080;

app.use(express.js());
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./TP-1/productos.json');

app.get('api/products', async (req, res) => {
    try {
        let data = await productManager.getProducts();
        console.log(data);
        res.json(data);

    } catch (err) {
        console.error('Error: ' + err.menssage);
        res.status(500).json({ error: 'Error al obtener los productos' })
    }
})

app.get('api/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let data = await productManager.getProductoById();
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(data);

    } catch (err) {
        console.error('Error: ' + err.menssage);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});