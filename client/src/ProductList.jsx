import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { getProducts, updateProduct, createProduct, deleteProduct } from "./services/api";

export default function ProductList() {
    const [produtos, setProdutos] = useState([])
    const [nome, setNome] = useState('')
    const [codigoBarras, setCodigoBarras] = useState('')
    const [descricao, setDescricao] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [categoria, setCategoria] = useState('')
    const [dataValidade, setDataValidade] = useState('')
    const [imagem, setImagem] = useState('')
    const [fornecedorId, setFornecedorId] = useState('')
    const [editingCodigoBarras, setEditingCodigoBarras] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    const resetForm = () => {
        setNome('')
        setCodigoBarras('')
        setDescricao('')
        setQuantidade('')
        setCategoria('')
        setDataValidade('')
        setImagem('')
        setFornecedorId('')
        setEditingCodigoBarras(null)
    }

    //busca a lista de usuários ao carregar o componente 
    useEffect(() => {
        setLoading(true)
        getProducts()
            .then(data => {
                setProdutos(data)
                setError(null)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    //função que trata o submit do formulário, tanto para criar quanto para editar um usuário
    function handleSubmit(e) {
        e.preventDefault()
        if (isNaN(quantidade) || parseInt(quantidade, 10) <= 0) {
            setError('A quantidade deve ser um número inteiro positivo.');
            return;
        }
        // Validação de formato da data
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataValidade)) {
            setError('A data de validade deve estar no formato DD/MM/AAAA.');
            return; 
        }
        if (editingCodigoBarras) { //se estiver editando um usuário
            setLoading(true)
            setError(null)
            setSuccess(null)
            const dataToUpdate = {
                codigoBarras,
                nome,
                descricao,
                quantidade,
                categoria,
                dataValidade,
                imagem,
                fornecedorId
            };
            updateProduct(editingCodigoBarras, dataToUpdate)
                .then(updateProduct => {
                    setProdutos(currentProduct => currentProduct.map(produto => produto.codigoBarras === updateProduct.codigoBarras ? updateProduct : produto))
                    setError(null)
                    setSuccess('Produto editado com sucesso!')
                    resetForm()
                })
                .catch(err => {
                    setError(err.message)
                    resetForm()
                })
                .finally(() => setLoading(false))
        } else { //se estiver criando um novo usuário
            setLoading(true)
            setError(null)
            setSuccess(null)
            createProduct({ nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId })
                .then(createProduct => {
                    setProdutos(currentProduct => [...currentProduct, createProduct])
                                        resetForm()
                    setError(null)
                    setSuccess('Produto adicionado com sucesso!')
                }
                )
                .catch(err => {
                    setError(err.message)
                    resetForm()
                })
                .finally(() => setLoading(false))
        }

    }
    //função para editar um usuário disparada ai clicar no botão Edit
    function handleEdit(produto) {
        setNome(produto.nome)
        setCodigoBarras(produto.codigoBarras)
        setDescricao(produto.descricao)
        setQuantidade(produto.quantidade)
        setCategoria(produto.categoria)
        setDataValidade(produto.dataValidade)
        setImagem(produto.imagem)
        setFornecedorId(produto.fornecedorId)
        setEditingCodigoBarras(produto.codigoBarras)
    }

    //deletar usuário
    function handleDelete(codigoBarras) {
        setLoading(true)
        setError(null)
        setSuccess(null)
        deleteProduct(codigoBarras)
            .then(() => {
                setProdutos(currentProduct => currentProduct.filter(produto => produto.codigoBarras !== codigoBarras))
                setError(null)
                setSuccess('Produto deletado com sucesso!')
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }

    return (
        <div style={{ marginTop: 24 }}>
            <h2>Produtos</h2>

            <ProductForm
                nome={nome}
                codigoBarras={codigoBarras}
                descricao={descricao}
                quantidade={quantidade}
                categoria={categoria}
                dataValidade={dataValidade}
                imagem={imagem}
                fornecedorId={fornecedorId}
                editingCodigoBarras={editingCodigoBarras}
                loading={loading}
                onChangeName={setNome}
                onChangeCodigoBarras={setCodigoBarras}
                onChangeDescricao={setDescricao}
                onChangeQuantidade={setQuantidade}
                onChangeCategoria={setCategoria}
                onChangeDataValidade={setDataValidade}
                onChangeImage={setImagem}
                onChangeFornecedorId={setFornecedorId}
                onSubmit={handleSubmit}
                onCancel={() => {
                    resetForm()
                    setError(null)
                    setSuccess(null)
                }}
            />

            {loading && <p style={{ color: 'yellow' }}>Carregando ...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <h2>Lista de Produtos: </h2>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.codigoBarras}> {produto.nome} - {produto.codigoBarras} - {produto.descricao} - {produto.quantidade} - {produto.categoria} - {produto.dataValidade} - {produto.imagem} - {produto.fornecedorId}
                        <button onClick={() => handleEdit(produto)}>Edit</button>
                        <button onClick={() => handleDelete(produto.codigoBarras)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}