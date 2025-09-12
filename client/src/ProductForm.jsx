export default function ProductForm({ nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem, fornecedorId, editingCodigoBarras, loading, onChangeName, onChangeCodigoBarras, onChangeDescricao, onChangeQuantidade, onChangeCategoria, onChangeDataValidade, onChangeImage, onChangeFornecedorId, onSubmit, onCancel }) {
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
                placeholder="Código de Barras"
                value={codigoBarras}
                onChange={e => onChangeCodigoBarras(e.target.value)}
                disabled={loading || editingCodigoBarras}
                required
            />
            <input
                placeholder="descricao"
                value={descricao}
                onChange={e => onChangeDescricao(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Quantidade"
                value={quantidade}
                onChange={e => onChangeQuantidade(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Categoria"
                value={categoria}
                onChange={e => onChangeCategoria(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Data de validade 00/00/0000"
                value={dataValidade}
                onChange={e => onChangeDataValidade(e.target.value)}
                disabled={loading}
                required
            />
            <input
                placeholder="Imagem"
                value={imagem}
                onChange={e => onChangeImage(e.target.value)}
                disabled={loading}
            />
            <input
                placeholder="Fornecedor Id"
                value={fornecedorId}
                onChange={e => onChangeFornecedorId(e.target.value)}
                disabled={loading}
                required
            />
            {/* se editingCodigoBarras for true o texto do botão sera "Update" se não será "Add" */}
            <button type="submit" disabled={loading}>{editingCodigoBarras ? "Update Fornecedor" : "Add Fornecedor"}</button>
            {/* se editingCodigoBarras for verdadeiro então exibe o botão de cancel */}
            {editingCodigoBarras && (
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