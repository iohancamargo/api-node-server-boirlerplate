'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const alertaModel = new schema({
    funcionario: { required: true, type: String },
    local : { required: true, type: String },
    tipo_sangue : { required: true, type: String },
    descricao: { type: String, default: "" },
    dataCriacao: { default: Date.now, type: Date }
}, { versionKey: false });

alertaModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Alerta', alertaModel)