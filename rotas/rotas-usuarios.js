import { Router } from "express";
import { 
    listarTodosUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    deletarUsuario,
    atualizarUsuario
} from "../controller/usuarios-controller.js";

const roteador = Router();
    
roteador.get("/", (req, res) => {
    listarTodosUsuarios(req, res);
});

roteador.get("/:id", (req,res) => {
    buscarUsuarioPorId(req, res);
});

roteador.post("/", (req, res) => {
    criarUsuario(req, res);
});

roteador.delete("/:id", (req, res) => {
    deletarUsuario(req, res);
});

roteador.patch("/:id", (req, res) => {
    atualizarUsuario(req, res);
});


export default roteador;