'use strict';
'use strict';
//modulos
const fs = require('fs');
const path = require('path');

//modelos
const User = require('../models/user');
const Animal = require('../models/animal');

//acciones

function pruebas(req, res) {
    res.status(200).send({
        message: 'probando el controlador de ANIMALES y la accion pruebas',
        user:req.user
    })
}

module.exports = {
    pruebas
};