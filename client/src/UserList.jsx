import {useEffect, useState} from "react";

export default function UserList() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    //busca a lista de usuários ao carregar o componente
    useEffect(() => {
        fetch('/api/users')
            .then(r => r.json())
            .then(data => setUsers(data))
    }, [])

    //função para adicionar um novo usuário
    function handleSubmit(e){
        e.preventDefault()
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(r => r.json())
        .then(newUser => {
            setUsers([...users, newUser]) //mantem a lista atual e adiciona o novo usuário
            setName('')
            setEmail('')
        })
        return (
            <div style={{marginTop: 24}}>
                <h2>Users</h2>
                <form onSubmit={handleSubmit} style={{marginBottom: 16}}>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <button type="submit">Add User</button>
                </form>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            </div>
        )
    }
}