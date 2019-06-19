require('../models/local-model');
const base = require('../bin/base/repository-base');

class alertaRepository {
    constructor() {
        this._base = new base('Local');
        this._projection = '_id email cnpj estado cidade rua num complemento nome descricao ativo';
    }

    async emailExiste(Email){
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async cnpjExiste(CNPJ){
        return await this._base._model.findOne({ cnpj: CNPJ }, this._projection)
    }

    async authenticate(Email, Senha){
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection);
    }

    async create(data){
        let criado = await this._base.create(data);
        return this._base._model.findById(criado._id, this._projection);
    }

    async update(id, data){
        let atualizado = await this._base.update(id, {
            email : data.email,
            cnpj : data.cnpj,
            estado : data.estado,
            cidade : data.cidade,
            rua : data.rua,
            num : data.num,
            complemento : data.complemento,
            nome : data.nome,
            descricao : data.descricao,
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

module.exports = alertaRepository;