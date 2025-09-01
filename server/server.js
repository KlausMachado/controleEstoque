const express = require('express');
const cors = require('cors'); //permite a comunicação entre back e front
const e = require('express');

const app = express();

app.use(cors());
app.use(express.json());

let fornecedores = [
    { id: 1, name: 'Alice', cnpj: '00.000.000/0000-00', endereco: 'Rua teste, n°0, Cidade/UF, CEP:00.000.000', telefone: '(00)00000-0000', email: 'alice@email.com', nomeContatoPrincipal: 'Alice' },
    { id: 2, name: 'Bob', cnpj: '00.000.000/0000-00', endereco: 'Rua teste, n°0, Cidade/UF, CEP:00.000.000', telefone: '(00)00000-0000', email: 'bob@email.com', nomeContatoPrincipal: 'Bob' },
];

//list all fornecedores
app.get('/api/fornecedores', (req, res) => {
    res.json(fornecedores);
});

//create new fornecedor
app.post('/api/fornecedores', (req, res) => {
    const { name, email } = req.body;
    if (!name || !cnpj || telefone || !endereco || !email || !nomeContatoPrincipal) {
        return res.status(400).json({ error: 'Preencha os dados obrigatorios' });
    }
    const newFornecedor = { id: fornecedor.length + 1, name, cnpj, telefone, endereço, email, nomeContatoPrincipal };
    fornecedores.push(newFornecedor);
    res.status(201).json(newFornecedor);
});

//update fornecedor
app.put('/api/fornecedores/:id', (req, res) => {
    const { id } = req.params;
    const { name, cnpj, endereco, telefone, email, nomeContatoPrincipal } = req.body;
    const fornecedor = fornecedores.find(fornecedor => fornecedor.id == id);


    if (!fornecedor) {
        return res.status(404).json({ error: 'Fonecedor não encontrado' });
    } else if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatorio' });
    } else if (!email) {
        return res.status(400).json({ error: 'Email é obrigatorio' });
    }
    if (name) { fornecedor.name = name }
    if (cnpj) { fornecedor.cnpj = cnpj }
    if (email) { fornecedor.email = email; }
    res.json(fornecedor)
})

//delete fornecedor
app.delete('/api/fornecedores/:id', (req, res) => {
    const { id } = req.params;
    const fornecedorIndex = fornecedores.findIndex(fornecedor => fornecedor.id == id);
    if (fornecedorIndex === -1) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    const deletedFornecedor = fornecedor.splice(fornecedorIndex, 1);
    res.json(deletedFornecedor[0]);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});