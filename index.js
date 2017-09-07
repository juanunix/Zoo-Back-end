'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo', {useMongoClient: true})
    .then(() => {
        console.log('la conexion a la base de datos esta correcta...');
        app.listen(port,() => {
            console.log('Servidor local con NOde y express Corre correctamente...');
        });

    })
    .catch(err => console.log(err));