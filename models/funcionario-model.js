'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const funcionarioModel = new schema({
    nome : { required: true, type: String },
    local : { required: true, type: String },
    email : { trim: true, index: true, unique: true, required: true, type: String },
    senha : { required: true, type: String },
    ativo : { type: Boolean, default: false },
    dataCriacao: { default: Date.now, type: Date }
}, { versionKey: false });

funcionarioModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Funcionario', funcionarioModel)