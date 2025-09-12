
let produtos = [
    { nome: "Produto 1", codigoBarras: "1", descricao: "produto numero 1", quantidade: "1", categoria: "categoria 1", dataValidade: "01/01/2031", imagem: "imagem do produto", fornecedorId: "1"},
    { nome: "Produto 2", codigoBarras: "2", descricao: "produto numero 2", quantidade: "2", categoria: "categoria 2", dataValidade: "02/02/2032", imagem: "imagem do produto", fornecedorId: "2"}
]

class ProductsController {
    getAll(req, res) {
        res.json(produtos)
    }

    createNewProduct(req, res) {
        const { nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId } = req.body;

        if (!nome || !codigoBarras || !descricao || !quantidade || !categoria || !dataValidade || !imagem || !fornecedorId) {
            return res.status(400).json({ error: 'Preencha os dados obrigatorios' });
        }

        if (isNaN(quantidade) || parseInt(quantidade, 10) <= 0) {
            setError('A quantidade deve ser um número inteiro positivo.');
            return;
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataValidade)) {
            setError('A data de validade deve estar no formato DD/MM/AAAA.');
            return; 
        }

        const codigoBarrasExiste = produtos.find(produto => produto.codigoBarras === codigoBarras);
        if (codigoBarrasExiste) {
            return res.status(409).json({error: 'codigoBarras já foi cadastrado na lista'})
        }

        const newProduto = { nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId };
        produtos.push(newProduto);
        res.status(201).json(newProduto);
    }

    updateProduct(req, res) {
        const { codigoBarras } = req.params;
        const { nome, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId } = req.body;
        
        if (isNaN(quantidade) || parseInt(quantidade, 10) <= 0) {
            setError('A quantidade deve ser um número inteiro positivo.');
            return;
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataValidade)) {
            setError('A data de validade deve estar no formato DD/MM/AAAA.');
            return; 
        }

        const produto = produtos.find(produto => produto.codigoBarras == codigoBarras);
        
        if (!produto) {
            return res.status(404).json({ error: 'produto não encontrado' });
        }

        if (nome) { produto.nome = nome }
        if (descricao) { produto.descricao = descricao; }
        if (quantidade) { produto.quantidade = quantidade; } 
        if (categoria) { produto.categoria = categoria; }
        if (dataValidade) { produto.dataValidade = dataValidade; }
        if (imagem) { produto.imagem = imagem; }
        if (fornecedorId) { produto.fornecedorId = fornecedorId; }
        res.json(produto)
    }

    deleteProduct(req, res) {
        const { codigoBarras } = req.params;
        const produtoIndex = produtos.findIndex(produto => produto.codigoBarras == codigoBarras);
        if (produtoIndex === -1) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        const deletedProduto = produtos.splice(produtoIndex, 1);
        res.json(deletedProduto[0]);
    }
}

const productsController = new ProductsController();
module.exports = productsController;