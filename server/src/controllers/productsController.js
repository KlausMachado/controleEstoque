let nextCodigo = 3

let produtos = [
    { nome: "Produto 1", codigoBarras: "1", descricao: "produto numero 1", quantidade: "1", categoria: "categoria 1", dataValidade: "01/01/2031", imagem: "imagem do produto", fornecedorId: "1"},
    { nome: "Produto 2", codigoBarras: "2", descricao: "produto numero 2", quantidade: "2", categoria: "categoria 2", dataValidade: "02/02/2032", imagem: "imagem do produto", fornecedorId: "2"}
]

export default class ProductsController {
    getAll(req, res) {
        res.json(produtos)
    }

    createNewSupplier(req, res) {
        const { nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId } = req.body;

        if (!nome || !codigoBarras || !descricao || !quantidade || !categoria || !dataValidade, imagem, fornecedorId) {
            return res.status(400).json({ error: 'Preencha os dados obrigatorios' });
        }

        const codigoBarrasExiste = fornecedores.find(fornecedor => fornecedor.codigoBarras === codigoBarras);
        if (codigoBarrasExiste) {
            return res.status(409).json({error: 'codigoBarras já foi cadastrado na lista'})
        }

        const newFornecedor = { id: nextId++, nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId };
        fornecedores.push(newFornecedor);
        res.status(201).json(newFornecedor);
    }
}