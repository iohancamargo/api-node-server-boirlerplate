'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const doacaoModel = new schema({
    data: { type: Date, required: true},
    doador: {type: String, required: true},
    local: {type: String, required: true},
    dataCriacao: { default: Date.now, type: Date }
}, { versionKey: false });

doacaoModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Doacao', doacaoModel)