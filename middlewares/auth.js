export function verifyUser(req,res,next) {
    console.log("Passei no middleware")

    const auth = req.headers.authorization;
    
    //verificar tipo do token
    if (!auth.startsWith("Basic")) {
        return res.status(400).json({message: "Token precisa ser Basic"})
    }
    //tem que ser basic

    
    //pegar conteudo encriptado
    const conteudo_do_token = auth.split(" ")[1];
    console.log(conteudo_do_token);

    //desencriptar o conteudo
    const token_descriptografado = Buffer.from(
        conteudo_do_token,
        "base64"
    ).toString()

    //tendo usuario e senha, preciso verificar se ele existe no banco
    const usuario = token_descriptografado.split(":")[0]

    
    //se nao existe, nao pode acessar

}