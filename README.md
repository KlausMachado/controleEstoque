# controleEstoque
* O usuário abre a página. O **UserList.jsx** é carregado e o useEffect dispara a busca por usuários, chamando a função **getUsers()** em **api.js**.

* A função **getUsers()** faz uma requisição GET para http://localhost:3333/api/users.

* O **server.js** do Node.js recebe essa requisição na rota app.get e responde com o array de usuários.

* A resposta chega no **api.js**, é processada por **handleResponse**, e os dados são usados para atualizar o estado **users** no **UserList.jsx**.

* A lista de usuários é então renderizada na tela.

* Quando o usuário edita um campo, o **onChange** correspondente em **UserForm.jsx** chama a função **onChangeName ou onChangeEmail** que, por sua vez, são as funções **setName e setEmail** do **UserList.jsx**, atualizando o estado.

* Quando o usuário clica em "Edit", **handleEdit** é chamado, preenchendo o formulário e definindo **editingUserId**.

* Quando o usuário envia o formulário, **handleSubmit** verifica que há um **editingUserId** e faz uma requisição PUT para o back-end. A rota app.put no servidor recebe, atualiza o array e responde com o usuário modificado.

* A resposta é recebida no front-end e o estado **users** é atualizado com o novo usuário. A mesma lógica se aplica para criar e deletar usuários.