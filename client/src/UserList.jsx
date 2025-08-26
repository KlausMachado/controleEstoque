import { useEffect, useState } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]) //renderiza a lista de usuários vazia inicialmente | setUsers é a função para atualizar o estado da lista de usuários
    const [name, setName] = useState('') //estado inicial (vazio) do campo name do formulário | setName é a função para atualizar o estado do name
    const [email, setEmail] = useState('') //estado inicial (vazio) do campo email do formulário | setEmail é a função para atualizar o estado do email
    const [editingUserId, setEditingUserId] = useState(null) //estado para armazenar o id do usuário sendo editado, null se não estiver editando

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
                .then(response => response.json())
                .then(updatedUser => {
                    setUsers(currentUsers => currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user)) //atualiza a lista de usuários com o usuário editado. currentUsers é o estado atual da lista de usuários | user é cada usuário na lista | se o id do usuário atual for igual ao id do usuário editado, substitui pelo usuário editado, senão mantém o usuário atual
                    setName('')
                    setEmail('')
                    setEditingUserId(null) //limpa o id do usuário sendo editado
                })
        } else { //se estiver criando um novo usuário
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
                .then(response => {
                    return response.json()
                }
                )
                .then(newUser => {
                    setUsers(currentUsers => [...currentUsers, newUser]) //mantem a lista atual e adiciona o novo usuário
                    setName('')
                    setEmail('')
                }
                )
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
        fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                setUsers(currentUsers => currentUsers.filter(user => user.id !== userId)) //remove o usuário deletado da lista local sem precisar recarregar a lista do backend
            })
            .catch(err => {
                console.error("Erro ao deletar usuário:", err)
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
            <h2>Lista de Usuários: </h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - ({user.email})
                        <button onClick={() => handleEdit(user)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}