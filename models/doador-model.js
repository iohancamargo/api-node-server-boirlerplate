'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const doadorModel = new schema({
    nome : { required: true, type: String },
    email : { trim: true, index: true, unique: true, required: true, type: String },
    senha : { required: true, type: String },
    eh_cadastrado: { type: Boolean, default: false },
    cidade: { required: true, type: String },
    estado: { required: true, type: String },
    tipo_sangue: { type: String, default: "" },
    sexo : { required: true, type: String },
    dataCriacao: { default: Date.now, type: Date }
}, { versionKey: false });

doadorModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Doador', doadorModel)