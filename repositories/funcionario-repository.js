require('../models/funcionario-model');
require('../models/local-model');
const md5 = require('md5')
const base = require('../bin/base/repository-base');

class doadorRepository {
    constructor() {
        this._base = new base('Funcionario');
        this._local = new base('Local');
        this._projection = '_id nome email local ativo';
        this._projectionLocal = '_id email cnpj estado cidade rua num complemento nome descricao ativo';
    }

    async emailExiste(Email){
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async localExiste(Local){
        try {
            return await this._local._model.findOne({ _id: Local }, this._projectionLocal);
        } catch (error) {
            return false;
        }
    }

    async authenticate(Email, Senha){
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection);
    }

    async create(data){
        let criado = await this._base.create(data);
        return this._base._model.findById(criado._id, this._projection)
    }

    async update(id, data){
        let atualizado = await this._base.update(id, {
            nome : data.nome,
            local : data.local,
            email : data.email,
            ativo : data.ativo
        });
        return this._base._model.findById(atualizado._id, this._projection)
    }

    async getAll(){
        return await this._base._model.find({}, this._projection);
    }

    async getById(id){
        return await this._base._model.findById(id, this._projection);
    }

    async delete(id){
        return await this._base.delete(id);
    }
}

module.exports = doadorRepository;