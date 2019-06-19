'use strict'

const repository = require('../repositories/doacao-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function doacaoController() {

}

doacaoController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.local, 'O Local não foi informado.');
    _validationContract.isRequired(req.body.doador, 'O Doador não foi informado.');
    _validationContract.isRequired(req.body.data, 'O campo data é obrigatório.');

    let localExiste = await _rep.localExiste(req.body.local);
    if (!localExiste) {
        _validationContract.isTrue(true, `Local ${req.body.local} não existe.`);
    } else {
        _validationContract.isTrue(localExiste.ativo == false, `O Local selecionado está desativado.`);
    }

    let doadorExiste = await _rep.doadorExiste(req.body.doador);
    if (!doadorExiste) {
        _validationContract.isTrue(true, `Doador ${req.body.doador} não existe.`);
    } else {
        _validationContract.isTrue(doadorExiste.nome == undefined, `O Doador selecionado está desativado.`);
    }

    controllerBase.post(_rep, _validationContract, req, res);
};

doacaoController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.local, 'O Local não foi informado.');
    _validationContract.isRequired(req.body.doador, 'O Doador não foi informado.');
    _validationContract.isRequired(req.body.data, 'O campo data é obrigatório.');

    let localExiste = await _rep.localExiste(req.body.local);
    if (!localExiste) {
        _validationContract.isTrue(true, `Local ${req.body.local} não existe.`);
    } else {
        _validationContract.isTrue(localExiste.ativo == false, `O Local selecionado está desativado.`);
    }

    let doadorExiste = await _rep.doadorExiste(req.body.doador);
    if (!doadorExiste) {
        _validationContract.isTrue(true, `Doador ${req.body.doador} não existe.`);
    } else {
        _validationContract.isTrue(doadorExiste.nome == undefined, `O Doador selecionado está desativado.`);
    }

    controllerBase.put(_rep, _validationContract, req, res);

};

doacaoController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

doacaoController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

doacaoController.prototype.getByDoador = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.params.id, 'O Doador não foi informado.');

    let doadorExiste = await _rep.doadorExiste(req.params.id);
    console.log(doadorExiste);
    if (!doadorExiste) {
        _validationContract.isTrue(true, `Doador inexistente.`);
        console.log('Não existe');
    } else {
        _validationContract.isTrue(doadorExiste.nome == undefined, `Doador desativado.`);
    }

    console.log("ok aqui");

    if (_validationContract.isValid()) {
        let doacoes = await _rep.getByDoador(req.params.id);
        res.status(200).send(doacoes);
    } else {
        res.status(400).send(
            {
                message: 'Falha ao carregar doações.',
                validation: _validationContract.errors()
            }
        );
        return
    }
};

doacaoController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

module.exports = doacaoController;