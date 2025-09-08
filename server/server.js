const express = require('express');
const cors = require('cors'); //permite a comunicação entre back e front
const suppliesController = require('./src/controllers/suppliesController');
const app = express();

app.use(cors());
app.use(express.json());

//list all fornecedores
app.get('/api/fornecedores', suppliesController.getAll);
//create new fornecedor
app.post('/api/fornecedores', suppliesController.createSupplier);
//update fornecedor
app.put('/api/fornecedores/:id', suppliesController.updateSupplier);
//delete fornecedor
app.delete('/api/fornecedores/:id', suppliesController.deleteSupplier);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});
