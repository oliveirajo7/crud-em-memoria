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
        nome:nome,
        email:email,
        id:ultimoId + 1
    }

    usuarios.push(novoUsuario);
    ultimoId += 1;

    res.status(201).json(novoUsuario.id);
});

app.listen(3000);
