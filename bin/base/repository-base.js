'use strict'

const mongoose = require('mongoose');

class RepositoryBase {
    constructor(model) {
        this._model = mongoose.model(model);
    }

    async create(data){
        let modelo = new this._model(data);
        return await modelo.save();
    }

    async update(id, data){
        await this._model.findByIdAndUpdate(id, { $set: data })
        return await this._model.findById(id);
    }

    async getAll(){
        return await this._model.find();
    }

    async getById(id){
        return await this._model.findById(id)
    }

    async delete(id){
        return await this._model.findByIdAndDelete(id);
    }
}

module.exports = RepositoryBase;