'use strict'

const axios = require('axios');
const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function userController() {

}

userController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
    _validationContract.isRequired(req.body.nome, 'O campo nome é obrigatório.');
    _validationContract.isRequired(req.body.senha, 'O campo senha é obrigatório.');
    _validationContract.isRequired(req.body.tipo, 'O tipo de usuário não foi informado.');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'O campo confirmação de senha é obrigatório.');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não são iguais.');
    
    if(req.body.tipo){
        if(req.body.tipo == "Doador"){
            _validationContract.isRequired(req.body.cidade, 'O campo cidade é obrigatório.');
            _validationContract.isRequired(req.body.estado, 'O campo estado é obrigatório.');
            _validationContract.isRequired(req.body.sexo, 'O campo sexo é obrigatório.');
        } else if(req.body.tipo == "Local"){
            _validationContract.isRequired(req.body.cidade, 'O campo cidade é obrigatório.');
            _validationContract.isRequired(req.body.estado, 'O campo estado é obrigatório.');
            _validationContract.isRequired(req.body.rua, 'O campo rua é obrigatório.');
        } else if(req.body.tipo == "Funcionário"){}
    }
    
    let usuarioExiste = await _rep.emailExiste(req.body.email);
    if (usuarioExiste){
        _validationContract.isTrue(usuarioExiste.nome != undefined, `Já existe o email ${req.body.email} cadastrado em nossa base`)
    }

    req.body.senha = md5(req.body.senha);
    
    await controllerBase.post(_rep, _validationContract, req, res);

    let User = await _rep.emailExiste(req.body.email);
    
    if (!usuarioExiste){
        if(User){
            if(req.body.tipo){
                if(req.body.tipo == "Doador"){
                    await axios.post(variables.Api.serv + variables.Api.port + '/api/doador/register', {
                        user: User._id,
                        cidade: req.body.cidade,
                        estado: req.body.estado,
                        sexo: req.body.sexo
                    })
                    .then((res) => {
                        console.log("Doador criado a partir de usuário.")
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                } else if(req.body.tipo == "Local"){
                    console.log("É um local")
                    await axios.post(variables.Api.serv + variables.Api.port + '/api/local/register', {
                        user: User._id,
                        nome: req.body.nome,
                        cidade: req.body.cidade,
                        estado: req.body.estado,
                        rua: req.body.rua,
                        num: req.body.num,
                        complemento: req.body.complemento
                    })
                    .then((res) => {
                        console.log("Local criado a partir de usuário.")
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                } else if(req.body.tipo == "Funcionário"){
                    console.log("É um funcionário")
                }
            }
        }
    }
};

userController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.params.id, 'O ID de edição é obrigatório.');
    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
    _validationContract.isRequired(req.body.nome, 'O campo nome é obrigatório.');
    _validationContract.isRequired(req.body.tipo, 'O tipo de usuário que está tentando criar é inválido.');

    let usuarioExiste = await _rep.emailExiste(req.body.email);
    if (usuarioExiste){
        _validationContract.isTrue(
            usuarioExiste.nome != undefined && 
            usuarioExiste._id != req.params.id, 
            `Já existe o email ${req.body.email} cadastrado em nossa base`)
    }

    controllerBase.put(_rep, _validationContract, req, res);
    
};

userController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

userController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

userController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

userController.prototype.autenticar = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email deve ser válido.');
    _validationContract.isRequired(req.body.senha, 'O campo senha é obrigatório.');

    if(!_validationContract.isValid()){
        res.status(400).send({message: 'Falha no login.', validation: _validationContract.errors() });
        return
    }

    let usuarioEncontrado = await _rep.authenticate(req.body.email, req.body.senha);
    if(usuarioEncontrado){
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({ user:usuarioEncontrado }, variables.Security.secretKey)
        }) 
    }else{
        res.status(404).send({message: 'Usuário e senha informados inválidos.' })
    }
}

module.exports = userController;