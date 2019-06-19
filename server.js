'use strict'

const app = require('./bin/express');
const variables = require('./bin/config/variables')

app.listen(variables.Api.port, () => {
    console.log(`API iniciada na porta ${variables.Api.port}.`)
})