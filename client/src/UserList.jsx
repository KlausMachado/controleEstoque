import { useEffect, useState } from "react";
import UserForm from "./UserForm";

export default function UserList() {
    const [users, setUsers] = useState([]) //renderiza a lista de usuários vazia inicialmente | setUsers é a função para atualizar o estado da lista de usuários
    const [name, setName] = useState('') //estado inicial (vazio) do campo name do formulário | setName é a função para atualizar o estado do name
    const [email, setEmail] = useState('') //estado inicial (vazio) do campo email do formulário | setEmail é a função para atualizar o estado do email
    const [editingUserId, setEditingUserId] = useState(null) //estado para armazenar o id do usuário sendo editado, null se não estiver editando
    const [error, setError] = useState(null) //estado para armazenar mensagens de erro
    const [success, setSuccess] = useState(null) //estado para armazenar mensagens de sucesso
    const [loading, setLoading] = useState(false) //estado para indicar se uma requisição está em andamento

    //busca a lista de usuários ao carregar o componente - dispara o GET '/api/users' do backend 
    useEffect(() => {
        setLoading(true)
        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários')
                }
                return response.json()
            })
            .then(data => {
                setUsers(data) //atualiza o estado com a lista de usuários vinda do backend
                setError(null)
            })
            .catch(err => {
                console.error("Erro ao buscar usuários:", err)
                setError('Erro ao carregar usuários') //define a mensagem de erro no estado
            })
            .finally(() => setLoading(false)) //indica que a requisição terminou
    }, [])

    //função que trata o submit do formulário, tanto para criar quanto para editar um usuário
    function handleSubmit(e) {
        e.preventDefault()
        if (editingUserId) { //se estiver editando um usuário
            setLoading(true)
            fetch(`/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
                .then(async response => {
                    if (!response.ok) {
                        setEditingUserId(null)
                        const errorData = await response.json()
                        throw new Error(errorData.error || 'Erro ao editar usuário')
                    }
                    return response.json()
                })
                .then(updatedUser => {
                    setUsers(currentUsers => currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user)) //atualiza a lista de usuários com o usuário editado. currentUsers é o estado atual da lista de usuários | user é cada usuário na lista | se o id do usuário atual for igual ao id do usuário editado, substitui pelo usuário editado, senão mantém o usuário atual
                    setName('')
                    setEmail('')
                    setError(null)
                    setEditingUserId(null) //limpa o id do usuário sendo editado
                    setSuccess('Usuário editado com sucesso!')
                })
                .catch(err => {
                    setError(err.message)
                    setName('')
                    setEmail('')
                })
                .finally(() => setLoading(false))
        } else { //se estiver criando um novo usuário
            setLoading(true)
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
                .then(async response => {
                    if (!response.ok) {
                        //se a resposta não for ok, lança um erro com a mensagem vinda do backend
                        const errorData = await response.json()
                        throw new Error(errorData.error || 'Erro ao adicionar usuário')
                    }
                    return response.json() //se a resposta for ok, retorna o usuário criado
                })
                .then(newUser => {
                    setUsers(currentUsers => [...currentUsers, newUser]) //mantem a lista atual e adiciona o novo usuário
                    setName('')
                    setEmail('')
                    setError(null) //limpa a mensagem de erro, se houver
                    setSuccess('Usuário adicionado com sucesso!') //define a mensagem de sucesso
                }
                )
                .catch(err => {
                    setError(err.message) //define a mensagem de erro no estado
                    setName('')
                    setEmail('')
                })
                .finally(() => setLoading(false))
        }

    }
    //função para editar um usuário disparada ai clicar no botão Edit
    function handleEdit(user) {
        setName(user.name)
        setEmail(user.email)
        setEditingUserId(user.id) //define o id do usuário sendo editado
    }

    //deletar usuário
    function handleDelete(userId) {
        setLoading(true)
        fetch(`/api/users/${userId}`, { //chama o backend para deletar o usuário
            method: 'DELETE'
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Erro ao deletar usuário')
                }
                return response.json()
            })
            .then(() => {
                setUsers(currentUsers => currentUsers.filter(user => user.id !== userId)) //remove o usuário deletado da lista local sem precisar recarregar a lista do backend
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
            <h2>Users</h2>
            
            <UserForm //passando os valores das props que serão usadas em UserForm
                name={name}
                email={email}
                editingUserId={editingUserId}
                loading={loading}
                onChangeName={setName}
                onChangeEmail={setEmail}
                onSubmit={handleSubmit}
                onCancel={()=>{
                    setEditingUserId(null)
                    setName('')
                    setEmail('')
                    setError(null)
                    setSuccess(null)
                }}
            />

            {loading && <p style={{ color: 'yellow' }}>Carregando ...</p>} {/*se estiver carregando, exibe a mensagem*/}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/*se houver uma mensagem de erro, exibe abaixo do formulário*/}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/*se houver uma mensagem de sucesso, exibe abaixo do formulário*/}
            <h2>Lista de Usuários: </h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}> {user.name} - ({user.email})
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}