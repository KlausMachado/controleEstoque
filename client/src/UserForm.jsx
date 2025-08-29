export default function UserForm({name, email, editingUserId, loading, onChangeName, onChangeEmail, onSubmit, onCancel}) {
    return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => onChangeName(e.target.value)}
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
                <button type="submit" disabled={loading}>{editingUserId ? "Update User" : "Add User"}</button>

                {editingUserId && (
                    <button 
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        style={{marginLeft: 8}}
                    >Cancel</button>
                )}
            </form>
    )

}