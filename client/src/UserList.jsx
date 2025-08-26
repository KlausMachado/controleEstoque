import { useEffect, useState } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]) //lista de usuários
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editingUserId, setEditingUserId] = useState(null) //usuário sendo editado

    //busca a lista de usuários ao carregar o componente
    useEffect(() => {
        fetch('/api/users')
            .then(response => {
                return response.json()
            })
            .then(data => {
                return setUsers(data)
            })
            .catch(err => {
                console.error("Erro ao buscar usuários:", err)
            })
    }, [])

    //função para adicionar ou editar um usuário
    function handleSubmit(e) {
        e.preventDefault()
        if (editingUserId) {
            //editando usuario
            fetch(`/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
                .then(response => response.json())
                .then(updatedUser => {
                    setUsers(currentUsers => currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user))
                    setName('')
                    setEmail('')
                    setEditingUserId(null) //limpa o id do usuário sendo editado
                })
        } else {
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
    //função para editar um usuário
    function handleEdit(user) {
        setName(user.name)
        setEmail(user.email)
        setEditingUserId(user.id) //define o id do usuário sendo editado
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