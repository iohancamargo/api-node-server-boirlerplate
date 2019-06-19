const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables')

module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['x-access-token'];
    if(token){
        try {
            let decoded = await jwt.verify(token, variables.Security.secretKey);
            console.log(decoded);
            req.usuarioLogado = decoded;
            next();
        } catch (err) {
            res.status(401).send({message: 'Falha de autenticação. Token inválido.'});
        }
    }else{
        res.status(401).send({message: 'Falha de autenticação. Token inesistente.'});
        return;
    }
}