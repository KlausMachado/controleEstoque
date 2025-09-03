async function handleResponse(response) {
    if (!response.ok) {
        //se a resposta não for ok, lança um erro com a mensagem vinda do backend
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao efetuar ação')
    }
    return response.json() //se a resposta for ok, retorna a responsta em formato JSON
}

//centralizando a comunicação com o back/ realiza todas as requisições
export function getFornecedores() {
    return fetch('/api/fornecedores')
        .then(handleResponse)
}

export function createFornecedor(userData) {
    return fetch('/api/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(handleResponse)
}

export function updateFornecedor(editingUserId, userData) {
    return fetch(`/api/fornecedores/${editingUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(handleResponse)
}

export function deleteFornecedor(fornecedorId) {
    return fetch(`/api/fornecedores/${fornecedorId}`, {
        method: 'DELETE'
    })
        .then(handleResponse)
}