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


app.get("/usuarios", (req, res) => {
  res.json(usuarios).status(200);
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

app.listen(3000);

/*
DELETAR

PRECISA DO ID DO USUÁRIO A SER DELETADO
- TRANFORMAR O ID DE STRING PARA NÚMERO
- SE O ID FOR INVALIDO, RETORNA 400
- VERIFICAR SE O USUÁRIO EXISTE
- SE NÃO EXISTIR, RETORNAR 404
 */