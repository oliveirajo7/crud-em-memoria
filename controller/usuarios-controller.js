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
    try {
        const usuarios_do_banco = await prisma.users.findMany();
        res.status(200).json(usuarios_do_banco);
    } catch (error) {
        console.log(error)
    }
}

async function buscarUsuarioPorId (req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um número" });
    }

    try {
        const usuario = await prisma.users.findUnique({where: {id: id}});

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        res.json(usuario).status(200);
    } catch (error) {
        console.log(error)
    }
};

async function criarUsuario (req, res) {
    const { name, email, age } = req.body;

    if (!nome || !email){
        return res.status(400).json({mensage:"Nome e email são obrigatórios "})
    }
    
    try {
        await prisma.users.create({
            data: {
                name: name,
                email: email,
                age: age
            }
        });
        res.status(201).send(user);

    } catch (error) {
        console.error(error);
    }
};



async function deletarUsuario (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res
        .status(400)
        .json({mensagem: "ID inválido"});
    }
    await prisma.users.delete({where: {id: id}});
    res.status(204).send();
};

async function atualizarUsuario (req, res) { 
    const id = parseInt(req.params.id);

    if (isNaN(id)){
        return res
        .status(400)
        .json({mensagem: "ID inválido"});
    }

    const { name, email, age } = req.body;

    await prisma.users.update({
      where: {id: id},
      data: { 
        name: name,
        email: email,
        age: age
      }
    });

    res.status(200).send();
};



export { 
    listarTodosUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
 };