const dotenv = require('dotenv');
dotenv.config();

const variables = {

    Api: {
        port: process.env.PORT || 3000,
        serv: 'http://localhost:'
    },
    Database: {
        connection: process.env.CONNECTION || 'mongodb://localhost'
    },
    Security:{
        secretKey: process.env.SECRET_KEY || ''
    }
}

module.exports = variables;