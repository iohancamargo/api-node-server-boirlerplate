'use strict'

const repository = require('../repositories/alerta-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();

function alertaController() {

}

alertaController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.local, 'É necessário informar o local.');
    _validationContract.isRequired(req.body.funcionario, 'É necessário informar o funcionario.');
    _validationContract.isRequired(req.body.tipo_sangue, 'O campo Tipo Sanguineo é obrigatório.');

    let localExiste = await _rep.localExiste(req.body.local);
    if (!localExiste){
        _validationContract.isTrue(true, `Local ${req.body.local} não existe.`);
    }else{
        _validationContract.isTrue(localExiste.ativo == false , `O Local selecionado está desativado.`);
    }

    let funcionarioExiste = await _rep.funcionarioExiste(req.body.funcionario);
    console.log(funcionarioExiste)
    if (!funcionarioExiste){
        _validationContract.isTrue(true, `Funcionario ${req.body.funcionario} não existe.`);
    }else{
        _validationContract.isTrue(funcionarioExiste.ativo == false, `O Funcionario selecionado está desativado.`);
    }

    controllerBase.post(_rep, _validationContract, req, res);
};

alertaController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.local, 'É necessário informar o local.');
    _validationContract.isRequired(req.body.funcionario, 'É necessário informar o funcionario.');
    _validationContract.isRequired(req.body.tipo_sangue, 'O campo Tipo Sanguineo é obrigatório.');

    let localExiste = await _rep.localExiste(req.body.local);
    if (!localExiste){
        _validationContract.isTrue(true, `Local ${req.body.local} não existe.`);
    }else{
        _validationContract.isTrue(localExiste.ativo == false , `O Local selecionado está desativado.`);
    }

    let funcionarioExiste = await _rep.funcionarioExiste(req.body.funcionario);
    if (!funcionarioExiste){
        _validationContract.isTrue(true, `Funcionario ${req.body.funcionario} não existe.`);
    }else{
        _validationContract.isTrue(funcionarioExiste.ativo == false, `O Funcionario selecionado está desativado.`);
    }

    controllerBase.put(_rep, _validationContract, req, res);
};

alertaController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

alertaController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

alertaController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

module.exports = alertaController;