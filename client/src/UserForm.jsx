//exibe formlario e botões, as informações vem de UserList.jsx
export default function UserForm({ name, email, editingUserId, loading, onChangeName, onChangeEmail, onSubmit, onCancel }) {
    return (
        <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
            <input
                placeholder="Name"
                value={name}
                onChange={e => onChangeName(e.target.value)} /*função para atualizar o valor de name */
                disabled={loading}
                required
            />
            <input
                placeholder="Email"
                value={email}
                onChange={e => onChangeEmail(e.target.value)}/*função para atualizar o valor de email */
                disabled={loading}
                required
            />
            {/* se editingUserId for true o texto do botão sera "Update User" se não será "Add User" */}
            <button type="submit" disabled={loading}>{editingUserId ? "Update User" : "Add User"}</button>
            {/* se editingUserId for verdadeiro então exibe o botão de cancel */}
            {editingUserId && (
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