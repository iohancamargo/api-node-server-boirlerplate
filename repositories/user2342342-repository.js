require('../models/user-model');
const md5 = require('md5')
const base = require('../bin/base/repository-base');

class userRepository {
    constructor() {
        this._base = new base('User');
        this._projection = '_id nome email tipo'
    }

    async emailExiste(Email){
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async authenticate(Email, Senha){
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection);
    }

    async create(data){
        let doadorCriado = await this._base.create(data);
        return this._base._model.findById(doadorCriado._id, this._projection)
    }

    async update(id, data){
        let doadorAtualizado = await this._base.update(id, {
            nome: data.nome
        });
        return this._base._model.findById(doadorAtualizado._id, this._projection)
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

module.exports = userRepository;