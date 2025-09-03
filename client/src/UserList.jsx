import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { getFornecedores, updateFornecedor, createFornecedor, deleteFornecedor } from "./services/api";

export default function UserList() {
    const [fornecedores, setFornecedores] = useState([]) //renderiza a lista de usuários vazia inicialmente | setFornecedores é a função para atualizar o estado da lista de usuários
    const [nome, setNome] = useState('') //estado inicial (vazio) do campo name do formulário | setNome é a função para atualizar o estado do name
    const [cnpj, setCnpj] = useState('') 
    const [telefone, setTelefone] = useState('') 
    const [endereco, setEndereco] = useState('') 
    const [email, setEmail] = useState('') //estado inicial (vazio) do campo email do formulário | setEmail é a função para atualizar o estado do email
    const [nomeContatoPrincipal, setNomeContatoPrincipal] = useState('') //estado inicial (vazio) do campo email do formulário | setEmail é a função para atualizar o estado do email
    const [editingFornecedorId, setEditingFornecedorId] = useState(null) //estado para armazenar o id do usuário sendo editado, null se não estiver editando
    const [error, setError] = useState(null) //estado para armazenar mensagens de erro
    const [success, setSuccess] = useState(null) //estado para armazenar mensagens de sucesso
    const [loading, setLoading] = useState(false) //estado para indicar se uma requisição está em andamento

    //busca a lista de usuários ao carregar o componente 
    useEffect(() => {
        setLoading(true)
        getFornecedores()
            .then(data => { //.then() funciona como uma ponte que transporta o resultado da requisição para o seu código, ele passa o resultado para a callback por isso data tem o conteudo de fornecedores 
                setFornecedores(data) //atualiza o estado com a lista de usuários vinda do backend
                setError(null)
            })
            .catch(err => {
                setError(err.message) //define a mensagem de erro no estado
            })
            .finally(() => setLoading(false)) //indica que a requisição terminou
    }, [])

    //função que trata o submit do formulário, tanto para criar quanto para editar um usuário
    function handleSubmit(e) {
        e.preventDefault()
        if (editingFornecedorId) { //se estiver editando um usuário
            setLoading(true)
            updateFornecedor(editingFornecedorId, { nome, cnpj, telefone, endereco, email, nomeContatoPrincipal })
                .then(updatedFornecedor => {
                    setFornecedores(currentFornecedor => currentFornecedor.map(user => user.id === updatedFornecedor.id ? updatedFornecedor : user)) //atualiza a lista de usuários com o usuário editado. currentFornecedor é o estado atual da lista de usuários | user é cada usuário na lista | se o id do usuário atual for igual ao id do usuário editado, substitui pelo usuário editado, senão mantém o usuário atual
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                    setError(null)
                    setEditingFornecedorId(null) //limpa o id do usuário sendo editado
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
                    setFornecedores(currentFornecedor => [...currentFornecedor, newFornecedor]) //mantem a lista atual e adiciona o novo usuário
                    setNome('')
                    setCnpj('')
                    setTelefone('')
                    setEndereco('')
                    setEmail('')
                    setNomeContatoPrincipal('')
                    setError(null) //limpa a mensagem de erro, se houver
                    setSuccess('Usuário adicionado com sucesso!') //define a mensagem de sucesso
                }
                )
                .catch(err => {
                    setError(err.message) //define a mensagem de erro no estado
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
        setEditingFornecedorId(fornecedor.id) //define o id do usuário sendo editado
    }

    //deletar usuário
    function handleDelete(fornecedorId) {
        setLoading(true)
        deleteFornecedor(fornecedorId)
            .then(() => {
                setFornecedores(currentFornecedor => currentFornecedor.filter(fornecedor => fornecedor.id !== fornecedorId)) //remove o usuário deletado da lista local sem precisar recarregar a lista do backend
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

            <UserForm //passando os valores das props que serão usadas em UserForm
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