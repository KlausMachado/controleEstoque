const express = require('express');
const cors = require('cors'); //permite a comunicação entre back e front

const app = express();

app.use(cors());
app.use(express.json());

let nextId = 3

let fornecedores = [
    { id: 1, nome: 'Alice', cnpj: '00.000.000/0000-00', telefone: '(00)00000-0000', endereco: 'Rua teste, n°0, Cidade/UF, CEP:00.000.000', email: 'alice@email.com', nomeContatoPrincipal: 'Alice' },
    { id: 2, nome: 'Bob', cnpj: '00.000.000/0000-00', telefone: '(00)00000-0000', endereco: 'Rua teste, n°0, Cidade/UF, CEP:00.000.000', email: 'bob@email.com', nomeContatoPrincipal: 'Bob' },
];

//list all fornecedores
app.get('/api/fornecedores', (req, res) => {
    res.json(fornecedores);
});

//create new fornecedor
app.post('/api/fornecedores', (req, res) => {
    const { nome, cnpj, telefone, endereco, email, nomeContatoPrincipal } = req.body;
    if (!nome || !cnpj || !telefone || !endereco || !email || !nomeContatoPrincipal) {
        return res.status(400).json({ error: 'Preencha os dados obrigatorios' });
    }
    const newFornecedor = { id: nextId++, nome, cnpj, telefone, endereco, email, nomeContatoPrincipal };
    fornecedores.push(newFornecedor);
    res.status(201).json(newFornecedor);
});

//update fornecedor
app.put('/api/fornecedores/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cnpj, endereco, telefone, email, nomeContatoPrincipal } = req.body;
    const fornecedor = fornecedores.find(fornecedor => fornecedor.id == id);


    if (!fornecedor) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    if (!nome || !cnpj || !telefone || !endereco || !email || !nomeContatoPrincipal) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (nome) { fornecedor.nome = nome }
    if (cnpj) { fornecedor.cnpj = cnpj }
    if (telefone) { fornecedor.telefone = telefone; }
    if (endereco) { fornecedor.endereco = endereco; }
    if (email) { fornecedor.email = email; }
    if (nomeContatoPrincipal) { fornecedor.nomeContatoPrincipal = nomeContatoPrincipal; }
    res.json(fornecedor)
})

//delete fornecedor
app.delete('/api/fornecedores/:id', (req, res) => {
    const { id } = req.params;
    const fornecedorIndex = fornecedores.findIndex(fornecedor => fornecedor.id == id);
    if (fornecedorIndex === -1) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    const deletedFornecedor = fornecedores.splice(fornecedorIndex, 1);
    res.json(deletedFornecedor[0]);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});