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

// tp-5
app.post('api/products', async (req, res) => {
    try {
        const productData = req.body;
        if (!productData.title || !productData.price) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        const newProduct = await productManager.addProduct(productData);
        res.status(201).json(newProduct);
    }

    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos para actualizar' });
        }
        const updatedProduct = await productManager.updateProduct(Number(id), updateFields);

        if (!updatedProduct) {
            return res.status(404).json({ error: `El producto con ID ${id} no existe` });
        }

        res.json({
            massage: 'Producto actualizado exitosamente',
            product: updatedProduct
        });
    }

    catch (err) {
        console.error('Error al actualizar:', err.message);
        res.status(500).json({ error: 'Error interno al internar actualizar el producto' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productDeleted = await productManager.deleteProductById(id);
        if (!productDeleted) {
            return res.status(404).json({ error: `El producto con ID ${id} no existe o ya fue eliminado` });
        }
        res.status(200).json({
            message: `Producto con ID ${id} eliminado exitosamente`,
            product: productDeleted
        });
    }

    catch (err) {
        console.error('Error al eliminar:', err.message);
        res.status(500).json({ error: 'Error interno al intentar eliminar el producto' });
    }
});