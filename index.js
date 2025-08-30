import express from "express";

const app = express();
app.use(express.json());

let ultimoId = 1;

const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "admin@gmail.com",
};

let usuarios = [usuario_admin];

// GET PARA LISTAR TODOS OS USUÁRIOS
app.get("/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

app.get("/usuarios/:id", (req,res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res
        .status(400)
        .json({ mensagem: "ID inválido, precisa ser um número" });
    }

    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(usuario).status(200);
});


app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
    }

    const novoUsuario = {
        id:ultimoId + 1,
        nome:nome,
        email:email
    }

    usuarios.push(novoUsuario);
    ultimoId += 1;

    res.status(201).json(novoUsuario.id);
});

app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id
    const idNumerico = parseInt(id);

    if (isNaN(idNumerico)) {
        return res
        .status(400)
        .json({ mensagem: "ID inválido, precisa ser um número" });
    }

    let posicao_do_usuario = usuarios.findIndex(
        (usuario) => usuario.id === idNumerico
    );

    if(posicao_do_usuario === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    //seguir daqui se eu nao tenho usuario

    usuarios.splice(posicao_do_usuario, 1);
        res.status(204).send();
});

app.patch ("/usuarios/:id", (req, res) => {
    const id = parseInt (req.params.id);

    if (isNaN(id)) {
        return res
        .status(400)
        .json({ mensagem: "ID inválido, precisa ser um número" });
    }

    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    //findindex -> -1
    //find -> undefined 

    const {nome, email} = req.body;

    if (!nome && !email) {
        return res
        .status(400)
        .json({ mensagem: "É necessário enviar pelo menos um dos dados para atualizar" });
    }

    if (email) {
        let email_existe = usuarios.findIndex((usuarios)=> usuarios.email === email);

        if(email_existe !== -1) {
            return res.status(409).json({ mensagem: "Já existe um usuário com esse email" });
        }

        usuario.email = email;
        console.log(`Usuario antes de eu atulizar o email: ${usuario}`);
    }

    if (nome) {
        usuario.nome = nome;
        console.log(`Usuario antes de eu atulizar o nome: ${usuario}`);
    }

    res.status(200).json(usuario);
});

app.listen(3000);

/*
DELETAR

PRECISA DO ID DO USUÁRIO A SER DELETADO
- TRANFORMAR O ID DE STRING PARA NÚMERO
- SE O ID FOR INVALIDO, RETORNA 400
- VERIFICAR SE O USUÁRIO EXISTE
- SE NÃO EXISTIR, RETORNAR 404
 */

/*
ATUALIZAR

PRECISA DO ID DO USUÁRIO A SER ATUALIZADO
- TRANFORMAR O ID DE STRING PARA NÚMERO
- SE O ID FOR INVALIDO, RETORNA 400

- PROCURAR O USUÁRIO DENTRO DO ARRAY -> FIND
- SE NÃO EXISTIR, RETORNAR 404

- PRECISA DOS DADOS PARA ATUALIZAR (NOME OU EMAIL)
- PEGAR OS DADOS DO BODY (IGUAL O CREATE)
- SE NAO TIVER NENHUM DOS DADOS QUE PRECISAMOS, RETORNAR 400

-CASO TENHA EMAIL, VERIFICAR SE JÁ EXISTE UM USUÁRIO COM ESSE EMAIL -> SOME
- SE SIM, RETORNAR 409 -> CONFLITO

- DANDO TUDO CERTO
- NOME DO USUARIO ATUALIZADO
- EMAIL DO USUARIO ATUALIZADO
*/

/*
BOAS PRATICAS
- USAR A MESMA ROTA
*/ 