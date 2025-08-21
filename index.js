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

    ultimoId++;
    const novoUsuario = { id: ultimoId, nome, email };
    usuarios.push(novoUsuario);

    return res.status(201).json(novoUsuario);
});

app.listen(3000);

/**
 * CRUD em memória
 * criar uma rota para pegar todos os usuários
 * criar u
 */