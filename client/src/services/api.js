async function handleResponse(response) {
    if (!response.ok) {
        //se a resposta não for ok, lança um erro com a mensagem vinda do backend
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao efetuar ação')
    }
    return response.json() //se a resposta for ok, retorna a responsta em formato JSON
}

export function getUsers() {
    return fetch('/api/users')
        .then(handleResponse)
}

export function createUser(userData) {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(handleResponse)
}

export function updateUser(editingUserId, userData) {
    return fetch(`/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(handleResponse)
}

export function deleteUser(userId) {
    return fetch(`/api/users/${userId}`, { //chama o backend para deletar o usuário
        method: 'DELETE'
    })
        .then(handleResponse)
}