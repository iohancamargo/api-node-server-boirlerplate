'use strict'

const repository = require('../repositories/doador-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function doadorController() {

}

doadorController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'O campo nome é obrigatório.');
    _validationContract.isRequired(req.body.email, 'O campo email é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
    _validationContract.isRequired(req.body.cidade, 'O campo cidade é obrigatório.');
    _validationContract.isRequired(req.body.estado, 'O campo estado é obrigatório.');
    _validationContract.isRequired(req.body.sexo, 'O campo sexo é obrigatório.');
    _validationContract.isRequired(req.body.senha, 'O campo senha é obrigatório.');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'O campo confirmação de senha é obrigatório.');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não são iguais.');

    let usuarioExiste = await _rep.emailExiste(req.body.email);
    if (usuarioExiste){
        _validationContract.isTrue(usuarioExiste.nome != undefined, `Já existe o email ${req.body.email} cadastrado em nossa base`)
    }

    if(_validationContract.isValid()){
        req.body.senha = md5(req.body.senha);
    }

    controllerBase.post(_rep, _validationContract, req, res);
};

doadorController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.params.id, 'O ID de edição é obrigatório.');
    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isRequired(req.body.nome, 'O campo nome é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
    _validationContract.isRequired(req.body.cidade, 'O campo cidade é obrigatório.');
    _validationContract.isRequired(req.body.estado, 'O campo estado é obrigatório.');
    _validationContract.isRequired(req.body.sexo, 'O campo sexo é obrigatório.');


    let usuarioExiste = await _rep.emailExiste(req.body.email);
    if (usuarioExiste){
        _validationContract.isTrue(
            usuarioExiste.nome != undefined && 
            usuarioExiste._id != req.params.id, 
            `Já existe o email ${req.body.email} cadastrado em nossa base`)
    }

    controllerBase.put(_rep, _validationContract, req, res);
    
};

doadorController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

doadorController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

doadorController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

doadorController.prototype.autenticar = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.email, 'Esse email não foi cadastrado ainda.');
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

module.exports = doadorController;