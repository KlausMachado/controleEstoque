import { useEffect, useState } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]) //renderiza a lista de usuários vazia inicialmente | setUsers é a função para atualizar o estado da lista de usuários
    const [name, setName] = useState('') //estado inicial (vazio) do campo name do formulário | setName é a função para atualizar o estado do name
    const [email, setEmail] = useState('') //estado inicial (vazio) do campo email do formulário | setEmail é a função para atualizar o estado do email
    const [editingUserId, setEditingUserId] = useState(null) //estado para armazenar o id do usuário sendo editado, null se não estiver editando
    const [error, setError] = useState(null) //estado para armazenar mensagens de erro

    //busca a lista de usuários ao carregar o componente - dispara o GET '/api/users' do backend 
    useEffect(() => {
        fetch('/api/users')
            .then(response => {
                return response.json()
            })
            .then(data => {
                return setUsers(data) //atualiza o estado com a lista de usuários vinda do backend
            })
            .catch(err => {
                console.error("Erro ao buscar usuários:", err)
            })
    }, [])

    //função que trata o submit do formulário, tanto para criar quanto para editar um usuário
    function handleSubmit(e) {
        e.preventDefault()
        if (editingUserId) { //se estiver editando um usuário
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
                    setError('')
                    setEditingUserId(null) //limpa o id do usuário sendo editado
                })
                .catch(err => {
                    setError(err.message)
                    setName('')
                    setEmail('')
                })
        } else { //se estiver criando um novo usuário
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
                    setError('') //limpa a mensagem de erro, se houver
                }
                )
                .catch(err => {
                    setError(err.message) //define a mensagem de erro no estado
                    setName('')
                    setEmail('')
                })
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
                setError('')
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div style={{ marginTop: 24 }}>
            <h2>Users</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <button type="submit">{editingUserId ? "Update User" : "Add User"}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/*se houver uma mensagem de erro, exibe abaixo do formulário*/}
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