require('../models/alerta-model');
require('../models/local-model');
require('../models/funcionario-model');

const base = require('../bin/base/repository-base');

class alertaRepository {
    constructor() {
        this._base = new base('Alerta');
        this._local = new base('Local');
        this._funcionario = new base('Funcionario');
        this._projectionLocal = '_id email cnpj estado cidade rua num complemento nome descricao ativo';
        this._projectionFuncionario = '_id nome local email ativo';
    }

    async localExiste(Local){
        try {
            return await this._local._model.findOne({ _id: Local }, this._projectionLocal);
        } catch (error) {
            return false;
        }
    }

    async funcionarioExiste(Funcionario){
        console.log(Funcionario)
        try {
            return await this._funcionario._model.findOne({ _id: Funcionario }, this._projectionFuncionario);
        } catch (error) {
            return false;
        }
    }

    async create(data){
        return await this._base.create(data);
    }

    async update(id, data){
        return await this._base.update(id, data);
    }

    async getAll(){
        return await this._base.getAll();
    }

    async getById(id){
        return await this._base.getById(id);
    }

    async delete(id){
        return await this._base.delete(id);
    }
}

module.exports = alertaRepository;