require('../models/doacao-model');
require('../models/local-model');
require('../models/doador-model');
const md5 = require('md5')
const base = require('../bin/base/repository-base');

class doadorRepository {
    constructor() {
        this._base = new base('Doacao');
        this._local = new base('Local');
        this._doador = new base('Doador');
        this._projection = '_id data doador local';
        this._projectionLocal = '_id email cnpj estado cidade rua num complemento nome descricao ativo';
        this._projectionDoador = '_id nome email eh_cadastrado cidade estado tipo_sangue sexo';
    }

    async getByDoador(Doador){
        return await this._base._model.find({doador: Doador}, this._projection);
    }

    async localExiste(Local){
        try {
            return await this._local._model.findOne({ _id: Local }, this._projectionLocal);
        } catch (error) {
            return false;
        }
    }

    async doadorExiste(Doador){
        try {
            return await this._doador._model.findOne({ _id: Doador }, this._projectionDoador);
        } catch (error) {
            return false;
        }
    }

    async create(data){
        let criado = await this._base.create(data);
        return this._base._model.findById(criado._id, this._projection)
    }

    async update(id, data){
        let atualizado = await this._base.update(id, {
            data : data.data,
            doador : data.doador,
            local : data.local
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