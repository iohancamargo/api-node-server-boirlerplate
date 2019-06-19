const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const variables = require('../bin/config/variables');

//Routes
const userRouter = require('../routes/user-router');
const localRouter = require('../routes/local-router');
const alertaRouter = require('../routes/alerta-router');
const doacaoRouter = require('../routes/doacao-router');
const doadorRouter = require('../routes/doador-router');
const funcionarioRouter = require('../routes/funcionario-router');

//Express 
const app = express();

//Parse json config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:false } ))

//Conexão banco
mongoose.connect(variables.Database.connection, { useNewUrlParser: true, useCreateIndex :  true })

//Routes config
app.use('/api/user', userRouter);
app.use('/api/alerta', alertaRouter);
app.use('/api/doacao', doacaoRouter);
app.use('/api/doador', doadorRouter);
app.use('/api/funcionario', funcionarioRouter);
app.use('/api/local', localRouter);

//Export app
module.exports = app;