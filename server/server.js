const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let users = [
    { id: 1, name: 'Alice', email: 'alice@email.com' },
    { id: 2, name: 'Bob', email: 'bob@email.com' },
];

//list all users
app.get('/api/users', (req, res) => {
    // console.log("chegou aqui no GET do server");

    res.json(users);
});

//create new user
app.post('/api/users', (req, res) => {
    // console.log("chegou aqui no POST do server");

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
    // console.log("chegou aqui no PUT do server")
    // console.log(req.params);
    const { id } = req.params;  //pega o id da url
    const { name, email } = req.body; 
    const user = users.find(user => user.id == id); //encontra o usuario pelo id

    //se não encontrar o usuario, retorna erro 404 se encontrar, atualiza o nome e email se fornecidos
    if (!user) {
        return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    if (name) { 
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    res.json(user) //retorna o usuario atualizado
});

//delete user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id == id); 
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    const deletedUser = users.splice(userIndex, 1); //remove o usuario do array
    res.json(deletedUser[0]); //retorna o usuario deletado
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});