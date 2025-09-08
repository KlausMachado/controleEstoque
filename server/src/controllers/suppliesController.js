let nextId = 3

let fornecedores = [
    { id: 1, nome: 'Fornecedor 1', cnpj: '00.000.000/0000-00', telefone: '(00)00000-0000', endereco: 'Rua teste, n°0, Cidade/UF, CEP:00.000.000', email: 'fornecedor1@email.com', nomeContatoPrincipal: 'Alice' },
    { id: 2, nome: 'Fornecedor 2', cnpj: '00.000.000/0000-01', telefone: '(00)00000-0000', endereco: 'Rua teste, n°0, Cidade/UF, CEP:00.000.000', email: 'fornecedor2@email.com', nomeContatoPrincipal: 'Bob' },
];

export default class SuppliesController {
    getAll(req, res) {
        res.json(fornecedores);
    }

    createNewSupplier(req, res) {
        const { nome, cnpj, telefone, endereco, email, nomeContatoPrincipal } = req.body;

        if (!nome || !cnpj || !telefone || !endereco || !email || !nomeContatoPrincipal) {
            return res.status(400).json({ error: 'Preencha os dados obrigatorios' });
        }

        const cnpjExiste = fornecedores.find(fornecedor => fornecedor.cnpj === cnpj);
        if (cnpjExiste) {
            return res.status(409).json({error: 'CNPJ já foi cadastrado na lista'})
        }

        const newFornecedor = { id: nextId++, nome, cnpj, telefone, endereco, email, nomeContatoPrincipal };
        fornecedores.push(newFornecedor);
        res.status(201).json(newFornecedor);
    }

    updateSupplier(req, res) {
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
    }

    deleteSupplier(req, res) {
        const { id } = req.params;
        const fornecedorIndex = fornecedores.findIndex(fornecedor => fornecedor.id == id);
        if (fornecedorIndex === -1) {
            return res.status(404).json({ error: 'Fornecedor não encontrado' });
        }
        const deletedFornecedor = fornecedores.splice(fornecedorIndex, 1);
        res.json(deletedFornecedor[0]);
    }

} 