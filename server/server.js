const express = require('express');
const cors = require('cors'); //permite a comunicação entre back e front
const supplierController = require("./src/controllers/suppliesController")
const productsController = require("./src/controllers/productsController")

const app = express();

app.use(cors());
app.use(express.json());

//FORNECEDORES
//list all fornecedores
app.get('/api/fornecedores', supplierController.getAll);
//create new fornecedor
app.post('/api/fornecedores', supplierController.createNewSupplier);
//update fornecedor
app.put('/api/fornecedores/:id', supplierController.updateSupplier)
//delete fornecedor
app.delete('/api/fornecedores/:id', supplierController.deleteSupplier);

//PRODUTOS
app.get('/api/produtos', productsController.getAll);
app.post('/api/produtos', productsController.createNewProduct);
app.put('/api/produtos/:codigoBarras', productsController.updateProduct)
app.delete('/api/produtos/:id', productsController.deleteProduct);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});