'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const alertaModel = new schema({
    email: { trim: true, index: true, unique: true, required: true, type: String },
    cnpj: { trim: true, unique: true, required: true, type: String },
    estado: {required: true, type: String},
    cidade: {required: true, type: String},
    rua: {required: true, type: String},
    num: {type: String, default: ''},
    complemento: {type: String, default: ''},
    nome: {required: true, type: String},
    senha : { required: true, type: String },
    descricao: {type: String, default: ''},
    ativo: {type: Boolean, default: false},
    dataCriacao: { default: Date.now, type: Date }
}, { versionKey: false });

alertaModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Local', alertaModel)