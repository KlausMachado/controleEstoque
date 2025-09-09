async function handleResponse(response) {
    if (!response.ok) {
        //se a resposta não for ok, lança um erro com a mensagem vinda do backend
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao efetuar ação')
    }
    return response.json() //se a resposta for ok, retorna a responsta em formato JSON
}

//centralizando a comunicação com o back/ realiza todas as requisições de fornecedor
export function getFornecedores() {
    return fetch('/api/fornecedores')
        .then(handleResponse)
}

export function createFornecedor(supplierData) {
    return fetch('/api/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
    })
        .then(handleResponse)
}

export function updateFornecedor(editingSupplierId, supplierData) {
    return fetch(`/api/fornecedores/${editingSupplierId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
    })
        .then(handleResponse)
}

export function deleteFornecedor(fornecedorId) {
    return fetch(`/api/fornecedores/${fornecedorId}`, {
        method: 'DELETE'
    })
        .then(handleResponse)
}

//centralizando a comunicação com o back de produtos
export function getProducts() {
    return fetch('/api/produtos')
        .then(handleResponse)
}

export function createProduct(productData) {
    return fetch('/api/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(handleResponse)
}

export function updateProduct(editingProductCod, productData) {
    return fetch(`/api/produtos/${editingProductCod}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(handleResponse)
}

export function deleteProduct(codigoBarras) {
    return fetch(`/api/produtos/${codigoBarras}`, {
        method: 'DELETE'
    })
        .then(handleResponse)
}