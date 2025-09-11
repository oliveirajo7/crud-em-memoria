//variaveis do controller
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let ultimoId = 1;

const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "admin@gmail.com",
};

let usuarios = [usuario_admin];


//funcoes do controller por rota
async function listarTodosUsuarios(req, res) {
    const usuarios_do_banco = await prisma.users.findMany();
    res.status(200).json(usuarios_do_banco);
}

async function buscarUsuarioPorId (req, res) {
    const id = parseInt(req.params.id);
    const usuario = await prisma.users.findUnique({where: {id: id}});
    res.json(usuario).status(200);
};

async function criarUsuario (req, res) {
    const user = await prisma.users.create({
        data: req.body
    });
    res.status(201).json(user.id);
};

async function deletarUsuario (req, res) {
    const id = parseInt(req.params.id);
    await prisma.users.delete({where: {id: id}});
    res.status(204).send();
};

async function atualizarUsuario (req, res) { 
    const id = parseInt(req.params.id);
    const atualizarUser = await prisma.users.update({
      where: {id: id},
      data: { ...req.body },
    });
    res.status(200).json(atualizarUser);
};



export { 
    listarTodosUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
 };