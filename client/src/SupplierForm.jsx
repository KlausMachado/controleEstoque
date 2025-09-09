export default function UserForm({ nome, cnpj, telefone, endereco, email, nomeContatoPrincipal, editingFornecedorId, loading, onChangeName, onChangeCnpj, onChangeTelefone, onChangeEndereco, onChangeEmail, onChangeNomeContato, onSubmit, onCancel }) {
    return (
        <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
            <input
                placeholder="Nome"
                value={nome}
                onChange={e => onChangeName(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="CNPJ"
                value={cnpj}
                onChange={e => onChangeCnpj(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Telefone"
                value={telefone}
                onChange={e => onChangeTelefone(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Endereco"
                value={endereco}
                onChange={e => onChangeEndereco(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Email"
                value={email}
                onChange={e => onChangeEmail(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Nome do contato principal"
                value={nomeContatoPrincipal}
                onChange={e => onChangeNomeContato(e.target.value)}
                disabled={loading}
                required
            />
            {/* se editingFornecedorId for true o texto do botão sera "Update User" se não será "Add User" */}
            <button type="submit" disabled={loading}>{editingFornecedorId ? "Update Fornecedor" : "Add Fornecedor"}</button>
            {/* se editingFornecedorId for verdadeiro então exibe o botão de cancel */}
            {editingFornecedorId && (
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    style={{ marginLeft: 8 }}
                >Cancel</button>
            )}
        </form>
    )

}