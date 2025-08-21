const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let users = [
    { id: 1, name: 'Alice', email: 'alice@email.com' },
    { id: 2, name: 'Bob', email: 'bob@email.com'},
];

//list all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

//create new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatorios' });
    }
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

//update user
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    if (name) {
        users.name = name;
    }
    if (email) {
        users.email = email;
    }
    res.json(user)
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});