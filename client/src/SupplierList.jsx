import { useEffect, useState } from "react";
import SupplierForm from "./SupplierForm";
import { getFornecedores, updateFornecedor, createFornecedor, deleteFornecedor } from "./services/api";

export default function SupplierList() {
    const [fornecedores, setFornecedores] = useState([])
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')
    const [email, setEmail] = useState('')
    const [nomeContatoPrincipal, setNomeContatoPrincipal] = useState('')
    const [editingFornecedorId, setEditingFornecedorId] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    //busca a lista de usuários ao carregar o componente 
    useEffect(() => {
        setLoading(true)
        getFornecedores()
            .then(data => {
                setFornecedores(data)
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
        if (editingFornecedorId) { //se estiver editando um usuário
            setLoading(true)
            updateFornecedor(editingFornecedorId, { nome, cnpj, telefone, endereco, email, nomeContatoPrincipal })
                .then(updatedFornecedor => {
                    setFornecedores(currentFornecedor => currentFornecedor.map(user => user.id === updatedFornecedor.id ? updatedFornecedor : user))
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                    setError(null)
                    setEditingFornecedorId(null)
                    setSuccess('Usuário editado com sucesso!')
                })
                .catch(err => {
                    setError(err.message)
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                })
                .finally(() => setLoading(false))
        } else { //se estiver criando um novo usuário
            setLoading(true)
            createFornecedor({ nome, cnpj, telefone, endereco, email, nomeContatoPrincipal })
                .then(newFornecedor => {
                    setFornecedores(currentFornecedor => [...currentFornecedor, newFornecedor])
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                    setError(null)
                    setSuccess('Usuário adicionado com sucesso!')
                }
                )
                .catch(err => {
                    setError(err.message)
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                })
                .finally(() => setLoading(false))
        }

    }
    //função para editar um usuário disparada ai clicar no botão Edit
    function handleEdit(fornecedor) {
        setNome(fornecedor.nome)
        setCnpj(fornecedor.cnpj)
        setTelefone(fornecedor.telefone)
        setEndereco(fornecedor.endereco)
        setEmail(fornecedor.email)
        setNomeContatoPrincipal(fornecedor.nomeContatoPrincipal)
        setEditingFornecedorId(fornecedor.id)
    }

    //deletar usuário
    function handleDelete(fornecedorId) {
        setLoading(true)
        deleteFornecedor(fornecedorId)
            .then(() => {
                setFornecedores(currentFornecedor => currentFornecedor.filter(fornecedor => fornecedor.id !== fornecedorId))
                setError(null)
                setSuccess('Usuário deletado com sucesso!')
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }

    return (
        <div style={{ marginTop: 24 }}>
            <h2>Fornecedores</h2>

            <SupplierForm 
                nome={nome}
                cnpj={cnpj}
                telefone={telefone}
                endereco={endereco}
                email={email}
                nomeContatoPrincipal={nomeContatoPrincipal}
                editingFornecedorId={editingFornecedorId}
                loading={loading}
                onChangeName={setNome}
                onChangeCnpj={setCnpj}
                onChangeTelefone={setTelefone}
                onChangeEndereco={setEndereco}
                onChangeEmail={setEmail}
                onChangeNomeContato={setNomeContatoPrincipal}
                onSubmit={handleSubmit}
                onCancel={() => {
                    setEditingFornecedorId(null)
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                    setError(null)
                    setSuccess(null)
                }}
            />

            {loading && <p style={{ color: 'yellow' }}>Carregando ...</p>} {/*se estiver carregando, exibe a mensagem*/}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/*se houver uma mensagem de erro, exibe abaixo do formulário*/}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/*se houver uma mensagem de sucesso, exibe abaixo do formulário*/}
            <h2>Lista de Fornecedores: </h2>
            <ul>
                {fornecedores.map(fornecedor => (
                    <li key={fornecedor.id}> {fornecedor.nome} - {fornecedor.cnpj} - {fornecedor.telefone} - {fornecedor.endereco} - {fornecedor.email} - {fornecedor.nomeContatoPrincipal}
                        <button onClick={() => handleEdit(fornecedor)}>Edit</button>
                        <button onClick={() => handleDelete(fornecedor.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}