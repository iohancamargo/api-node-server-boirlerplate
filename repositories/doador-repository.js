require('../models/doador-model');
const md5 = require('md5')
const base = require('../bin/base/repository-base');

class doadorRepository {
    constructor() {
        this._base = new base('Doador');
        this._projection = '_id nome email eh_cadastrado cidade estado tipo_sangue sexo';
    }

    async emailExiste(Email){
        return await this._base._model.findOne({ email: Email }, this._projection)
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
            email : data.email,
            eh_cadastrado : data.eh_cadastrado,
            cidade : data.cidade,
            estado : data.estado,
            tipo_sangue : data.tipo_sangue,
            sexo : data.sexo
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